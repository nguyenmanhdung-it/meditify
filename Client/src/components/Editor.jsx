// @ts-nocheck
import * as React from "react";
import axios from "axios";

export const Editor = React.memo(
  React.forwardRef((props, ref) => {
    const elementRef = React.useRef(null);
    const useUpdateEffect = (fn, deps) => {
      const mounted = React.useRef(false);
      return React.useEffect(() => {
        if (!mounted.current) {
          mounted.current = true;
          return;
        }

        return fn && fn();
      }, deps);
    };
    function findDiffKeys(obj1, obj2) {
      if (!obj1 || !obj2) {
        return {};
      }

      return Object.keys(obj1)
        .filter((key) => !obj2.hasOwnProperty(key))
        .reduce((result, current) => {
          result[current] = obj1[current];
          return result;
        }, {});
    }

    function isExist(element) {
      return (
        element !== null &&
        typeof element !== "undefined" &&
        element.nodeName &&
        element.parentNode
      );
    }
    function classNames(...args) {
      if (args) {
        let classes = [];

        for (let i = 0; i < args.length; i++) {
          let className = args[i];

          if (!className) continue;

          const type = typeof className;

          if (type === "string" || type === "number") {
            classes.push(className);
          } else if (type === "object") {
            const _classes = Array.isArray(className)
              ? className
              : Object.entries(className).map(([key, value]) =>
                  !!value ? key : null
                );

            classes = _classes.length
              ? classes.concat(_classes.filter((c) => !!c))
              : classes;
          }
        }

        return classes.join(" ");
      }

      return undefined;
    }

    const contentRef = React.useRef(null);
    const toolbarRef = React.useRef(null);
    const MinhAnh = React.useRef(null);
    const isMinhAnhLoaded = React.useRef(false);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.keyCode === 13) {
        var text = MinhAnh.current.getText();
        // remove 2 last characters in text
        text = text.substring(0, text.length - 1);
        
        setIsLoading(true);
        axios
        .post("http://127.0.0.1:5000/api/generate/", { prompt: text })
        .then((res) => {
          setIsLoading(false);
          var text = res.data;
          console.log(text);
          var pos = 0, delay = 30;
          pos = MinhAnh.current.getSelection().index;
          for (var i = 0; i < text.data.length; i++) {
            setTimeout(function (i) {
              MinhAnh.current.insertText(pos, text.data[i]);
              pos++;
            }, delay * i, i);
          }
        });
      }
    };

    React.useEffect(() => {
      if (!isMinhAnhLoaded.current) {
        import("quill")
          .
          then((module) => {
            if (module && isExist(contentRef.current)) {
              const configuration = {
                modules: {
                  toolbar: props.showHeader ? toolbarRef.current : false,
                  ...props.modules,
                },
                placeholder: props.placeholder,
                readOnly: props.readOnly,
                theme: props.theme,
                formats: props.formats,
                scrollingContainer: "html",
              };

              if (module.default) {
                MinhAnh.current = new module.default(
                  contentRef.current,
                  configuration
                );
              } else {
                MinhAnh.current = new module(contentRef.current, configuration);
              }

              if (props.value) {
                MinhAnh.current.setContents(
                  MinhAnh.current.clipboard.convert(props.value)
                );
              }

              MinhAnh.current.on("text-change", (delta, source) => {
                let firstChild = contentRef.current.children[0];
                let html = firstChild ? firstChild.innerHTML : null;
                let text = MinhAnh.current.getText();
                if (html === "<p><br></p>") {
                  html = null;
                }

                if (props.onTextChange) {
                  props.onTextChange({
                    htmlValue: html,
                    textValue: text,
                    delta: delta,
                    source: source,
                  });
                }
              });

              MinhAnh.current.on(
                "selection-change",
                (range, oldRange, source) => {
                  if (props.onSelectionChange) {
                    props.onSelectionChange({
                      range: range,
                      oldRange: oldRange,
                      source: source,
                    });
                  }
                }
              );
            }
          })
          .then(() => {
            if (MinhAnh.current && MinhAnh.current.getModule("toolbar")) {
              props.onLoad && props.onLoad(MinhAnh.current);
            }
          });

        isMinhAnhLoaded.current = true;
      }
    }, []);

    useUpdateEffect(() => {
      if (MinhAnh.current && !MinhAnh.current.hasFocus()) {
        props.value;
        MinhAnh.current.setContents(MinhAnh.current.clipboard.convert(props.value));
        MinhAnh.current.setText("");
      }
    }, [props.value]);

    React.useImperativeHandle(ref, () => ({
      getMinhAnh: () => MinhAnh.current,
      getElement: () => elementRef.current,
      getContent: () => contentRef.current,
      getToolbar: () => toolbarRef.current,
      ...props,
    }));

    const createToolbarHeader = () => {
      if (props.showHeader === false) {
        return null;
      } else if (props.headerTemplate) {
        return (
          <div ref={toolbarRef} className="p-editor-toolbar">
            {props.headerTemplate}
          </div>
        );
      } else {
        return (
          <div ref={toolbarRef} className="p-editor-toolbar">
            <span className="ql-formats">
              <select className="ql-header" defaultValue="0">
                <option value="1">Heading</option>
                <option value="2">Subheading</option>
                <option value="0">Normal</option>
              </select>
              {/* <select className="ql-font">
                <option></option>
                <option value="serif"></option>
                <option value="monospace"></option>
              </select> */}
            </span>
            <span className="ql-formats">
              <button
                type="button"
                className="ql-bold"
                aria-label="Bold"
              ></button>
              <button
                type="button"
                className="ql-italic"
                aria-label="Italic"
              ></button>
              <button
                className="ql-strike"
                type="button"
                aria-label="Strikethrough"
              ></button>
              <button className="ql-blockquote"></button>

              <button
                type="button"
                className="ql-underline"
                aria-label="Underline"
              ></button>
            </span>
            <span className="ql-formats">
              <select className="ql-color"></select>
              <select className="ql-background"></select>
            </span>
            <span className="ql-formats">
              <button
                type="button"
                className="ql-list"
                value="ordered"
                aria-label="Ordered List"
              ></button>
              <button
                type="button"
                className="ql-list"
                value="bullet"
                aria-label="Unordered List"
              ></button>
              <select className="ql-align">
                <option defaultValue></option>
                <option value="center"></option>
                <option value="right"></option>
                <option value="justify"></option>
              </select>
            </span>
            <span className="ql-formats">
              <button
                type="button"
                className="ql-link"
                aria-label="Insert Link"
              ></button>

              <button
                type="button"
                className="ql-image"
                aria-label="Insert Image"
              ></button>
              <button
                type="button"
                className="ql-code-block"
                aria-label="Insert Code Block"
              ></button>
            </span>
            <span className="ql-formats">
              <button
                type="button"
                className="ql-clean"
                aria-label="Remove Styles"
              ></button>
            </span>
          </div>
        );
      }
    };

    const otherProps = findDiffKeys(props, Editor.defaultProps);
    const className = classNames(
      "p-component p-editor-container",
      props.className
    );
    const header = createToolbarHeader();
    const content = (
      <div
        ref={contentRef}
        className="p-editor-content"
        style={props.style}
      ></div>
    );

    return (
      <div className={isLoading ? "loading" : null}>
      <div id={props.id} ref={elementRef} className={className} {...otherProps}>
        {header}
        {content}
      </div>
      </div>
    );
  })
);

Editor.displayName = "Editor";
Editor.defaultProps = {
  __TYPE: "Editor",
  id: null,
  value: null,
  style: null,
  className: null,
  placeholder: "Type spme thing :> ...",
  readOnly: false,
  modules: null,
  formats: null,
  theme: "snow",
  showHeader: true,
  headerTemplate: null,
  onTextChange: null,
  onSelectionChange: null,
  onLoad: null,
};
