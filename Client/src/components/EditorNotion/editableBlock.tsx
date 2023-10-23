
import React from "react";
import ContentEditable from "react-contenteditable";
import "./editorNotion.scss";

class EditableBlock extends React.Component<any, any> {
  private contentEditable: any;
  constructor(props: any) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      htmlBackup: null,
      html: "",
      tag: "p",
      previousKey: ""
    };
  }

  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag });
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const htmlChanged = prevState.html !== this.state.html;
    const tagChanged = prevState.tag !== this.state.tag;
    if (htmlChanged || tagChanged) {
      this.props.updatePage({
        id: this.props._id,
        html: this.state.html,
        tag: this.state.tag
      });
    }
  }

  onChangeHandler(e: any) {
    this.setState({ html: e.target.value });
  }




  onKeyDownHandler = (e: any) => {
    if (e.key === "/") {
      this.setState({ htmlBackup: this.state.html });
    }
    if (e.key === "Enter") {
      if (this.state.previousKey !== "Shift") {
        e.preventDefault();
        this.props.addBlock({
          id: this.props._id,
          ref: this.contentEditable.current
        });
      }
    }
    if (e.key === "Backspace" && !this.state.html) {
      e.preventDefault();
      this.props.deleteBlock({
        id: this.props._id,
        ref: this.contentEditable.current
      });
    }
    this.setState({ previousKey: e.key });
  }




  render() {
    return (
      <div className="ContentEditable">

        <ContentEditable
          className="Block"
          innerRef={this.contentEditable}
          html={this.state.html}
          tagName={this.state.tag}
          onChange={this.onChangeHandler}
          onKeyDown={this.onKeyDownHandler}
        />
      </div>
    );
  }
}

export default EditableBlock;