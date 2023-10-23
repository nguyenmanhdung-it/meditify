import React, { Component, useState } from 'react';
// @ts-ignore
import { Editor } from "../Editor";
import { Button } from "primereact/button";
import "../../../editor.scss";
import "./editor.scss";

export default class EditorDemo extends Component<any, any> {
    constructor(props: any) {
        super(props);
        // this.theme = "bubble";
        this.state = {
            content: '',
            name: '',
        };

    }

    handleChange = (e: any) => {
        this.setState({
            name: e.target.value
        })
    };
    renderHeader() {
        
        return (
            <span className="ql-formats">
                <button className="ql-bold" id="ql-bold"> <h3></h3></button>
                <button className="ql-header" value="2"></button>
                <button className="ql-italic" ></button>
                <button className="ql-underline" ></button>
                {/* <button className="ql-color ql-picker ql-color-picker"></button> */}
                <select className="ql-color" >
                </select>
                <select className="ql-background">
                </select>
                <button className="ql-strike"></button>
                <button className="ql-image"></button>
                <button className="ql-video"></button>
                <button className="ql-align" value="center"></button>
                <button className="ql-align" value="left"></button>
                <button className="ql-align" value="right"></button>
                <button className="ql-code-block"></button>
                <button className="ql-blockquote"></button>
            </span >
        );
    }
    
    render() {
        const header = this.renderHeader();
        const { getData } = this.props;
        getData(this.state);
        // console.log(this.state);
        function scrollToTestDiv() {
            const divElement = document.getElementById("scroll");
            divElement?.scrollIntoView({ behavior: 'smooth' });
        }
        function scrollToDiv() {
            const divElement = document.getElementById("head");
            divElement?.scrollIntoView({ behavior: 'smooth' });
        }
        var clipboard: string;
        return (
            <div id="editor">
                {/* <a className="nav-link" id="head" onClick={scrollToTestDiv} style={{ top: "50px" }}> Preview? </a> */}
                <div className="content-section introduction">
                </div>

                <div className="content-section implementation">
                    <div
                        onClick={() => {
                            clipboard = this.state.content;
                            navigator.clipboard.writeText(clipboard);
                        }}
                    >
                        Copy
                    </div>
                    <textarea id="title"
                        placeholder="Title"
                        className="single-post-title writeInput"
                        value={this.state.name}
                        onChange={this.handleChange} />
                    <Editor
                        className="BlogStyle CustomEditor"
                        placeholder="Type something..."
                        // headerTemplate={header}
                        theme = "bubble"
                        value={this.state.content}
                        // onTextChange={(e) => this.setState({
                        //     content: e.htmlValue
                        // })}
                        // make  an event onTextChange if text 2 is change and replace <script> to <p><script></p>
                        onTextChange={(e : any) => this.setState({
                            content: e.htmlValue
                        })}
                    />
                    <div className="border" id="scroll" ></div>
                    <div onClick={scrollToDiv}>Go home</div>
                    {/* <p id="raw" style={{ width: "70vw", margin: "auto" }}> {this.state.content || 'empty'}</p> */}
                    <p id="raw" style={{ width: "70vw", margin: "auto" }}> {this.state.content || 'empty'}</p>
                    <div>
                        <div className="border"></div>
                        <h1 className="writeInput" >{this.state.name}</h1>
                        <section className="BlogStyle" dangerouslySetInnerHTML={{ __html: this.state.content }}></section>
                    </div>
                    <div onClick={scrollToDiv}>Go home</div>
                    <Button label="Clear" icon="pi pi-times" onClick={() => this.setState({ content: '' })} />
                </div>
            </div>
        );
    }
}
