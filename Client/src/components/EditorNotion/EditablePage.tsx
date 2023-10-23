import React from "react";
import EditableBlock from "./editableBlock";
const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const initialBlock = { id: uid(), html: "", tag: "p" };

const setCaretToEnd = (element: any) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
  element.focus();
};

class EditablePage extends React.Component<{}, { blocks: typeof initialBlock[] }> {
  constructor(props: any) {
    super(props);
    this.updatePageHandler = this.updatePageHandler.bind(this);
    this.addBlockHandler = this.addBlockHandler.bind(this);
    this.deleteBlockHandler = this.deleteBlockHandler.bind(this);
    this.state = { blocks: [initialBlock] };
  }

  updatePageHandler(updatedBlock: any) {
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b._id).indexOf(updatedBlock._id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html
    };
    this.setState({ blocks: updatedBlocks });
  }

  addBlockHandler(currentBlock: any) {
    const newBlock = { id: uid(), html: "", tag: "p" };
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b._id).indexOf(currentBlock._id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock);
    //  this.setState({ blocks: updatedBlocks }, () => {
    //     currentBlock.ref.nextElementSibling.focus();
    // }); 
    //use call back for setState then focus()
    this.setState({ blocks: updatedBlocks }, () => {
      currentBlock.ref.nextElementSibling.focus();
    });
  }


  deleteBlockHandler(currentBlock: any) {
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      const blocks = this.state.blocks;
      const index = blocks.map((b) => b._id).indexOf(currentBlock._id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      this.setState({ blocks: updatedBlocks }, () => {
        setCaretToEnd(previousBlock);
        previousBlock.focus();
      });
    }
  }

  render() {
    return (
      <div className="Page">
        {this.state.blocks.map((block, key) => {
          return (
            <EditableBlock
              key={key}
              id={block._id}
              tag={block.tag}
              html={block.html}
              updatePage={this.updatePageHandler}
              addBlock={this.addBlockHandler}
              deleteBlock={this.deleteBlockHandler}
            />
          );
        })}
      </div>
    );
  }
}

export default EditablePage;