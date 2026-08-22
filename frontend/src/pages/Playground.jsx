import React, { useState } from "react";
import "./Playground.css";

const Playground = () => {
    const [html, setHtml] = useState(
        `<div class="card">
            <h1>Hello VertexPortal!</h1>
            <p>Start coding and see your changes live.</p>
            <button>Click Me</button>
        </div>`
    );

    const [css, setCss] = useState(
        `.card {
            padding: 30px;
            text-align: center;
            border-radius: 16px;
            background: #171d31;
            color: white;
        }

        button {
            padding: 10px 18px;
            border: none;
            border-radius: 8px;
            background: #7655ed;
            color: white;
            cursor: pointer;
        }`
    );

    const [js, setJs] = useState(
        `document.querySelector("button")?.addEventListener("click", () => {
            alert("Hello from VertexPortal Playground!");
        });`
    );

    const preview = `
                <!DOCTYPE html>
                <html>
                <head>
                <style>
                ${css}
                </style>
                </head>
                <body>

                ${html}

                <script>
                ${js}
                <\/script>

                </body>
                </html>
                `;

    return (
        <div className="playground-page">

            <header className="playground-header">

                <div className="playground-brand">
                    <div className="playground-brand-icon">
                        ✦
                    </div>

                    <span>
                        Vertex<span>Portal</span>
                    </span>
                </div>

                <div className="playground-title">
                    &lt;/&gt; Code Playground
                </div>

                <button
                    className="playground-run-button"
                    onClick={() => {
                        const iframe = document.getElementById(
                            "playground-preview"
                        );

                        if (iframe) {
                            iframe.srcdoc = preview;
                        }
                    }}
                >
                    ▶ Run Code
                </button>

            </header>


            <main className="playground-container">

                <div className="playground-intro">

                    <span>
                        INTERACTIVE LEARNING
                    </span>

                    <h1>
                        Build. Experiment. Learn.
                    </h1>

                    <p>
                        Write HTML, CSS and JavaScript and see your
                        changes instantly.
                    </p>

                </div>


                <div className="playground-workspace">

                    {/* HTML */}

                    <div className="editor-panel">

                        <div className="editor-header">
                            <span className="editor-dot html-dot"></span>
                            HTML
                        </div>

                        <textarea
                            value={html}
                            onChange={(e) =>
                                setHtml(e.target.value)
                            }
                            spellCheck="false"
                        />

                    </div>


                    {/* CSS */}

                    <div className="editor-panel">

                        <div className="editor-header">
                            <span className="editor-dot css-dot"></span>
                            CSS
                        </div>

                        <textarea
                            value={css}
                            onChange={(e) =>
                                setCss(e.target.value)
                            }
                            spellCheck="false"
                        />

                    </div>


                    {/* JS */}

                    <div className="editor-panel">

                        <div className="editor-header">
                            <span className="editor-dot js-dot"></span>
                            JavaScript
                        </div>

                        <textarea
                            value={js}
                            onChange={(e) =>
                                setJs(e.target.value)
                            }
                            spellCheck="false"
                        />

                    </div>

                </div>


                {/* Preview */}

                <section className="preview-panel">

                    <div className="preview-header">
                        <span>LIVE PREVIEW</span>

                        <span className="preview-status">
                            ● Ready
                        </span>
                    </div>

                    <iframe
                        id="playground-preview"
                        title="Code Playground Preview"
                        srcDoc={preview}
                        sandbox="allow-scripts"
                    />

                </section>

            </main>

        </div>
    );
};

export default Playground;