export async function prompt(
  title: string,
  description: string,
  placeholderValue: string | number,
  isPlaceholder: boolean,
) {
  let t = Date.now();

  let input = isPlaceholder
    ? `placeholder="${placeholderValue}"`
    : `value="${placeholderValue}"`;
  let disabled = isPlaceholder ? 'disabled' : '';

  figma.showUI(
    `

<body>
    <h2>${title}</h2>

    <p>${description}</p>
        <input id="prompt" type="text" ${input} onkeyup="success()" "/>
        <button id="button" ${disabled} onclick="myFunction()">Ok</button>
    <script>


const input = document.getElementById("prompt");
input.focus()


input.addEventListener("keyup", function(event) {

  if (event.keyCode === 13) {

    event.preventDefault();

    document.getElementById("button").click();
  }
});


    function success() {
        if(document.getElementById("prompt").value==="") { 
               document.getElementById('button').disabled = true; 
           } else { 
               document.getElementById('button').disabled = false;
           }
       }

        function myFunction(){
            parent.postMessage({ pluginMessage: {"type": 'prompt${t}',   "value": document.getElementById('prompt').value} }, '*')
        }



    </script>
</body>
<style> body { padding: 20px; flex-direction: column; margin: 0; background-color: var(--figma-color-bg); } h2, p { font-size: 13px; color: var(--figma-color-text); margin: 0 0 8px; } p { font-size: 11px; color: var(--figma-color-text-secondary); } button, input { background-color: var(--figma-color-bg); color: var(--figma-color-text); padding: 4px; font-size: 11px; font-weight: 400; } body, button { display: flex; font-family: "Inter", sans-serif; } button { align-items: center; border-radius: 4px; color: var(--figma-color-text-onbrand); flex-shrink: 0; font-weight: 500; height: 32px; padding: 0 8px; text-decoration: none; outline: 0; border: 2px solid transparent; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; position: fixed; bottom: 20px; right: 20px; min-width: 64px; justify-content: center; background-color: var(--figma-color-bg-brand); } button:disabled { background-color: var(--figma-color-bg-disabled-secondary); } div { display: flex; flex-direction: row; } </style> 
`,
    {
      width: 300,
      height: 150,
      themeColors: true,
    },
  );

  let promptValue = new Promise(resolve => {
    figma.ui.onmessage = message => {
      if (message.type == 'prompt' + t) {
        console.log(message.value);
      }
    };
  });

  const returnData: any = await new Promise((resolve, reject) => {
    figma.ui.onmessage = message => {
      if (message.type == 'prompt' + t) {
        figma.ui.close();
        resolve(message.value);
      }
    };
    figma.on('close', () => {
      reject('plugin closed');
    });
  });
  return returnData;
}
