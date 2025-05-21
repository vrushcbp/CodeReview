// import { useState, useEffect } from "react";
// import "prismjs/themes/prism-tomorrow.css";
// import Editor from "react-simple-code-editor";
// import prism from "prismjs";
// import "./App.css";
// import axios from "axios";
// import Markdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";


// function App() {
//   const [code, setCode] = useState(``);
//   const [review, setReview] = useState("");

//   useEffect(() => {
//     prism.highlightAll();
//   }, []);

//   async function reviewCode() {
//     const response = await axios.post("http://localhost:3000/ai/get-response", {
//       code,
//     });
//     setReview(response?.data?.candidates[0]?.content?.parts[0]?.text);
//   }

//   return (
//     <>
//       <main>
//         <div className="left">
//           <div className="header">
//             <h3>Code</h3>
//             <p>Paste your code here and get a review</p>
//           </div>
//           <div className="code">
//             <Editor
//               value={code}
//               onValueChange={(code) => setCode(code)}
//               highlight={(code) =>
//                 prism.highlight(code, prism.languages.js, "js")
//               }
//               padding={10}
//               style={{
//                 fontFamily: '"Fira code", "Fira Mono", monospace',
//                 fontSize: 16,
//                 height: "100%",
//                 width: "100%",
//               }}
//             />
//           </div>
//           <div className="review" onClick={reviewCode}>
//             Review
//           </div>
//         </div>
//         <div className="right">
//           <div className="header">
//             <h3>Review</h3>
//             <p>Get a review of your code</p>
//           </div>
//           <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
//         </div>
//       </main>
//     </>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "./App.css";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Loader from "./Component/Loader"; // ⬅️ import the loader

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ⬅️ loader state

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setIsLoading(true);
    setReview("");
    try {
      const response = await axios.post("http://localhost:3000/ai/get-response", {
        code,
      });
      setReview(response?.data?.candidates[0]?.content?.parts[0]?.text);
    } catch (err) {
      setReview("❌ Error fetching review. Please try again.");
    }
    setIsLoading(false);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="header">
            <h3>Code</h3>
            <p>Paste your code here and get a review</p>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.js, "js")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}>
            Review
          </div>
        </div>
        <div className="right">
          <div className="header">
            <h3>Review</h3>
            <p>Get a review of your code</p>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
