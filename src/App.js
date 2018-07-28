import React, { Component } from 'react';
import marked from 'marked';
import { markedURL, markdown } from './config'
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: markdown
        }
    }

    handleChange = (event) =>  {
        this.setState({
            markdown: event.target.value
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Markdown Previewer</h1>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2 className="Editor-title">Editor</h2>
                            <Editor markdown={this.state.markdown}
                                    onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <h2 className="Preview-title">Preview</h2>
                            <Preview markdown={this.state.markdown} />
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    &copy; by Chester Heng. Powered by&nbsp;
                    <a href={markedURL}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="link">Marked</a>.
                </div>
            </div>
        );
    }
}

// click a link, the link is opened up in a new tab
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
}

// interprets carriage returns and renders them as br (line break) elements.
const createMarkup = (props) => {
    return {
        __html: marked(props.markdown, {
            breaks: true,
            renderer: renderer
        })
    };
}

const Preview = (props) => {
    return (
        <div id='preview'
             dangerouslySetInnerHTML={ createMarkup(props) } />
    )
}

const Editor = (props) => {
    return (
        <textarea id="editor"
                  value={props.markdown}
                  onChange={props.onChange}
                  type="text"/>
    )
}

