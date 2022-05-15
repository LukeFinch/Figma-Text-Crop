<template>
  <div id="ui">
    <div
      class="banner"
      v-bind:class="{ error: !selectionCount, success: selectionCount }"
    >
      <div class="type type--bold type--large p-xxsmall">{{ helperText }}</div>
    </div>
    <div class="svg-container">
      <svg
        width="400"
        height="90"
        viewBox="0 0 400 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="lines">
        <line
          id="ascender"
          class="line"
          :class="{ 'line-selected': top == 'ascender' }"
          y1="0.5"
          x2="400"
          y2="0.5"
          @click="() => {top = 'ascender'}"
        />
        <line
          id="capheight"
          class="line"
          :class="{ 'line-selected': top == 'capheight' }"
          y1="6.90039"
          x2="400"
          y2="6.90039"
          @click="() => {top = 'capheight'}"
        />
        <line
          id="xheight"
          class="line"
          :class="{ 'line-selected': top == 'xheight' }"
          y1="26.5503"
          x2="400"
          y2="26.5503"
          @click="() => {top = 'xheight'}"
        />
        <line
          id="baseline"
          class="line"
          :class="{ 'line-selected': bottom == 'baseline' }"
          y1="67.9579"
          x2="400"
          y2="67.9579"
        />
        <line
          id="descender"
          class="line"
          :class="{ 'line-selected': bottom == 'descender' }"
          y1="88.7629"
          x2="400"
          y2="88.7629"
        />
        </g>
      <g id="text">
        <path
          d="M76.9332 22.5489H73.6731C73.514 20.2694 73.143 18.3611 72.5598 16.8237C71.9767 15.2864 71.1286 14.0937 70.0153 13.2455C68.9551 12.3443 67.6033 11.7082 65.96 11.3371C64.3167 10.966 62.3553 10.7805 60.0758 10.7805C58.1144 10.7805 56.5241 10.8335 55.3048 10.9395C54.1386 10.9925 53.2374 11.1251 52.6013 11.3371C51.9651 11.5492 51.541 11.8142 51.329 12.1323C51.17 12.3973 51.0904 12.7684 51.0904 13.2455V55.7867C51.0904 57.4831 51.1965 58.9409 51.4085 60.1601C51.6736 61.3794 52.1507 62.3866 52.8398 63.1817C53.582 63.9239 54.6157 64.507 55.9409 64.9311C57.3192 65.3022 59.1216 65.5142 61.348 65.5672V68.5888H31.2909V65.5672C33.5173 65.5142 35.3197 65.3022 36.698 64.9311C38.0763 64.507 39.11 63.9239 39.7991 63.1817C40.5413 62.3866 41.0184 61.3794 41.2304 60.1601C41.4955 58.9409 41.628 57.4831 41.628 55.7867V13.2455C41.628 12.7684 41.522 12.3973 41.3099 12.1323C41.1509 11.8142 40.7798 11.5492 40.1967 11.3371C39.6666 11.1251 38.898 10.9925 37.8907 10.9395C36.8835 10.8335 35.5318 10.7805 33.8354 10.7805C31.768 10.7805 29.8331 10.86 28.0307 11.0191C26.2814 11.1781 24.7441 11.6552 23.4188 12.4503C22.1465 13.1925 21.1128 14.3587 20.3176 15.9491C19.5225 17.5394 19.0984 19.7393 19.0454 22.5489H16.1033V7.3613H76.1381L76.9332 22.5489Z"
          fill="var(--figma-color-text)"
        />
        <path
          d="M95.0946 81.0729C92.6561 86.533 88.8659 89.2631 83.7238 89.2631C80.3841 89.2631 78.7143 88.0173 78.7143 85.5258C78.7143 84.2005 79.1649 83.2198 80.066 82.5837C81.0202 82.0006 82.7431 81.497 85.2346 81.0729C86.3478 80.9139 87.302 80.6753 88.0972 80.3572C88.8924 80.0922 89.608 79.7211 90.2441 79.244C90.8803 78.8199 91.4369 78.2633 91.914 77.5742C92.4441 76.885 92.9477 76.0369 93.4248 75.0297L96.2079 69.4635L80.9407 36.3052C80.2516 34.8209 79.642 33.6547 79.1119 32.8065C78.6348 31.9053 78.1046 31.2162 77.5215 30.7391C76.9914 30.209 76.3818 29.8644 75.6927 29.7054C75.0035 29.4933 74.1288 29.3343 73.0686 29.2283V26.4452H94.1404V29.2283C90.5887 29.2283 88.8128 30.103 88.8128 31.8523C88.8128 32.5415 89.0249 33.6282 89.449 35.1125C89.8731 36.5968 90.4032 38.1076 91.0393 39.6449L99.7861 60.7962H100.184L107.42 42.9051C108.109 41.1557 108.665 39.7244 109.089 38.6112C109.567 37.498 109.911 36.5968 110.123 35.9076C110.388 35.1655 110.547 34.5559 110.6 34.0788C110.706 33.6017 110.759 33.1511 110.759 32.727C110.759 31.3487 110.362 30.421 109.567 29.9439C108.824 29.4668 107.367 29.2283 105.193 29.2283V26.4452H122.687V29.2283C121.68 29.2283 120.831 29.3608 120.142 29.6259C119.453 29.8909 118.737 30.5005 117.995 31.4547C117.306 32.3559 116.511 33.6812 115.61 35.4305C114.762 37.1799 113.701 39.5389 112.429 42.5075L95.0946 81.0729Z"
          fill="var(--figma-color-text)"
        />
        <path
          d="M140.234 32.1704H140.552C142.248 30.156 144.077 28.5656 146.038 27.3994C148 26.2332 150.279 25.65 152.877 25.65C155.898 25.65 158.655 26.2067 161.147 27.3199C163.691 28.3801 165.891 29.8909 167.746 31.8523C169.602 33.8137 171.033 36.1462 172.04 38.8497C173.1 41.5003 173.631 44.4159 173.631 47.5965C173.631 50.8302 173.1 53.7988 172.04 56.5024C170.98 59.1529 169.522 61.4324 167.667 63.3408C165.812 65.2492 163.612 66.7335 161.067 67.7937C158.523 68.8539 155.766 69.384 152.797 69.384C150.359 69.384 148.132 68.9864 146.118 68.1913C144.157 67.3431 142.301 65.9913 140.552 64.1359V75.7453C140.552 77.8657 140.658 79.5621 140.87 80.8343C141.082 82.1066 141.506 83.0873 142.142 83.7764C142.778 84.4656 143.679 84.9427 144.846 85.2077C146.065 85.4728 147.655 85.6318 149.617 85.6848V88.4679H125.126V85.6848C126.716 85.6318 127.988 85.4728 128.942 85.2077C129.95 84.9427 130.718 84.4656 131.248 83.7764C131.832 83.0873 132.229 82.1331 132.441 80.9139C132.653 79.7476 132.759 78.2103 132.759 76.3019V46.5628C132.759 43.4882 132.706 40.9702 132.6 39.0088C132.547 37.0474 132.415 35.6956 132.203 34.9535C131.938 33.6812 131.328 32.833 130.374 32.4089C129.42 31.9318 127.617 31.6933 124.967 31.6933V28.9897L140.234 25.9681V32.1704ZM142.619 34.4764C141.93 35.5366 141.4 36.8088 141.029 38.2931C140.711 39.7244 140.552 41.6063 140.552 43.9388V50.1411C140.552 51.5723 140.578 52.8181 140.631 53.8783C140.737 54.8855 140.87 55.7602 141.029 56.5024C141.188 57.2445 141.4 57.9071 141.665 58.4903C141.93 59.0734 142.275 59.63 142.699 60.1601C143.918 61.8565 145.376 63.1817 147.072 64.1359C148.769 65.0371 150.544 65.4877 152.4 65.4877C156.058 65.4877 159 63.9504 161.226 60.8758C163.506 57.8011 164.645 53.4807 164.645 47.9146C164.645 45.158 164.327 42.6665 163.691 40.4401C163.108 38.1606 162.26 36.2257 161.147 34.6354C160.033 32.992 158.682 31.7198 157.091 30.8186C155.554 29.9174 153.831 29.4668 151.923 29.4668C150.014 29.4668 148.238 29.9174 146.595 30.8186C145.005 31.6668 143.679 32.886 142.619 34.4764Z"
          fill="var(--figma-color-text)"
        />
        <path
          d="M219.011 61.1938C214.505 66.6539 208.913 69.384 202.233 69.384C199.106 69.384 196.27 68.8804 193.725 67.8732C191.181 66.813 188.981 65.3552 187.125 63.4998C185.323 61.5914 183.918 59.3384 182.911 56.7409C181.904 54.0904 181.4 51.1748 181.4 47.9941C181.4 44.7605 181.93 41.7653 182.991 39.0088C184.051 36.2522 185.535 33.8932 187.443 31.9318C189.405 29.9704 191.711 28.4331 194.361 27.3199C197.065 26.2067 200.007 25.65 203.188 25.65C208.33 25.65 212.306 27.0548 215.115 29.8644C217.925 32.621 219.329 36.5968 219.329 41.7919C219.329 42.534 219.17 42.9846 218.852 43.1436C218.587 43.3027 217.925 43.3822 216.864 43.3822H190.704C190.598 43.8063 190.518 44.3364 190.465 44.9725C190.412 45.5556 190.386 46.2183 190.386 46.9604C190.386 49.717 190.704 52.235 191.34 54.5145C192.029 56.7409 192.983 58.6493 194.202 60.2396C195.475 61.8299 196.959 63.0757 198.655 63.9769C200.405 64.8251 202.34 65.2492 204.46 65.2492C206.686 65.2492 208.754 64.7721 210.662 63.8179C212.571 62.8107 214.532 61.1938 216.546 58.9674L219.011 61.1938ZM205.891 39.7244C206.951 39.7244 207.8 39.6979 208.436 39.6449C209.072 39.5919 209.549 39.4859 209.867 39.3268C210.185 39.1678 210.397 38.9558 210.503 38.6907C210.609 38.3726 210.662 37.9751 210.662 37.498C210.662 35.0595 209.867 33.1246 208.277 31.6933C206.739 30.209 204.619 29.4668 201.915 29.4668C196.19 29.4668 192.639 32.886 191.26 39.7244H205.891Z"
          fill="var(--figma-color-text)"
        />
        <path
          d="M224.835 27.7175H233.821V20.402C233.821 14.3057 235.411 9.56125 238.592 6.16856C241.825 2.72285 246.411 1 252.348 1C255.635 1 258.312 1.5036 260.379 2.51081C262.447 3.51801 263.48 4.81678 263.48 6.40711C263.48 7.46732 263.136 8.36851 262.447 9.11066C261.81 9.7998 260.989 10.1444 259.982 10.1444C259.345 10.1444 258.656 9.95883 257.914 9.58776C257.225 9.16367 256.297 8.47453 255.131 7.52034C253.806 6.40711 252.772 5.69146 252.03 5.3734C251.288 5.00232 250.413 4.81678 249.406 4.81678C246.225 4.81678 243.946 6.43361 242.567 9.66728C242.09 10.7275 241.746 12.0263 241.534 13.5636C241.375 15.1009 241.295 17.2213 241.295 19.9249V27.7175H254.097V31.4547H241.295V55.7867C241.295 57.7481 241.401 59.3649 241.613 60.6372C241.878 61.9095 242.302 62.9432 242.886 63.7383C243.522 64.4805 244.37 65.0106 245.43 65.3287C246.49 65.5937 247.869 65.7528 249.565 65.8058V68.5888H226.982V65.8058C228.467 65.7528 229.659 65.6202 230.561 65.4082C231.462 65.1431 232.151 64.6925 232.628 64.0564C233.105 63.3673 233.423 62.4396 233.582 61.2733C233.741 60.0541 233.821 58.4373 233.821 56.4228V31.4547H224.835V27.7175Z"
          fill="var(--figma-color-text)"
        />
        <path
          d="M283.607 45.052C280.585 46.2183 278.014 47.358 275.893 48.4712C273.826 49.5844 272.156 50.6977 270.884 51.8109C269.612 52.9241 268.684 54.0374 268.101 55.1506C267.571 56.2638 267.306 57.4036 267.306 58.5698C267.306 60.3191 267.889 61.7504 269.055 62.8637C270.221 63.9769 271.759 64.5335 273.667 64.5335C275.045 64.5335 276.318 64.1889 277.484 63.4998C278.703 62.8107 279.763 61.883 280.664 60.7167C281.566 59.4975 282.281 58.0927 282.811 56.5024C283.342 54.859 283.607 53.1362 283.607 51.3338V45.052ZM283.607 41.6328V38.3726C283.607 31.9053 280.85 28.6717 275.337 28.6717C274.436 28.6717 273.667 28.7512 273.031 28.9102C272.395 29.0692 271.865 29.3343 271.441 29.7054C271.016 30.0765 270.619 30.6066 270.248 31.2957C269.93 31.9848 269.612 32.833 269.294 33.8402C268.711 35.3775 268.127 36.4112 267.544 36.9414C267.014 37.4185 266.219 37.657 265.159 37.657C262.508 37.657 261.183 36.3317 261.183 33.6812C261.183 31.1367 262.535 29.1753 265.238 27.797C267.942 26.3657 271.785 25.65 276.768 25.65C282.069 25.65 285.833 26.6042 288.059 28.5126C290.286 30.368 291.399 33.5487 291.399 38.0546V55.8662C291.399 61.9095 292.592 64.9311 294.977 64.9311C295.72 64.9311 296.435 64.8516 297.124 64.6925C297.813 64.4805 298.397 63.9769 298.874 63.1817L299.987 65.0901C299.351 66.3094 298.185 67.3431 296.488 68.1913C294.792 68.9864 293.016 69.384 291.161 69.384C288.828 69.384 287.079 68.6418 285.913 67.1575C284.799 65.6732 284.243 63.5793 284.243 60.8758H283.845C282.467 63.4733 280.558 65.5407 278.12 67.078C275.681 68.5623 272.978 69.3045 270.009 69.3045C266.67 69.3045 264.046 68.4563 262.137 66.76C260.229 65.0636 259.275 62.7841 259.275 59.9216C259.275 58.6493 259.487 57.43 259.911 56.2638C260.388 55.0976 261.13 53.9843 262.137 52.9241C263.144 51.8639 264.47 50.8302 266.113 49.823C267.756 48.7628 269.771 47.7026 272.156 46.6423L283.607 41.6328Z"
          fill="var(--figma-color-text)"
        />
        <path
          d="M340.12 61.989C338.211 64.3215 335.746 66.1503 332.725 67.4756C329.703 68.7479 326.443 69.384 322.944 69.384C320.135 69.384 317.537 68.8804 315.152 67.8732C312.819 66.813 310.805 65.3552 309.108 63.4998C307.412 61.5914 306.087 59.3119 305.132 56.6614C304.231 54.0108 303.781 51.0688 303.781 47.8351C303.781 44.4424 304.311 41.3943 305.371 38.6907C306.431 35.9342 307.916 33.6017 309.824 31.6933C311.785 29.7319 314.118 28.2476 316.821 27.2404C319.578 26.1802 322.6 25.65 325.886 25.65C327.954 25.65 329.836 25.8356 331.532 26.2067C333.228 26.5247 334.686 27.0018 335.905 27.638C337.178 28.2211 338.158 28.9632 338.847 29.8644C339.537 30.7126 339.881 31.6403 339.881 32.6475C339.881 33.7077 339.537 34.5294 338.847 35.1125C338.158 35.6956 337.204 35.9872 335.985 35.9872C335.031 35.9872 334.235 35.8016 333.599 35.4305C332.963 35.0065 332.142 34.1053 331.134 32.727C330.074 31.5077 329.04 30.6596 328.033 30.1825C327.079 29.6524 325.833 29.3873 324.296 29.3873C320.532 29.3873 317.67 30.8451 315.708 33.7607C313.8 36.6763 312.846 40.9702 312.846 46.6423C312.846 52.7386 313.906 57.377 316.026 60.5577C318.2 63.6853 321.354 65.2492 325.489 65.2492C327.715 65.2492 329.809 64.8251 331.77 63.9769C333.732 63.0757 335.72 61.6444 337.734 59.683L340.12 61.989Z"
          fill="var(--figma-color-text)"
        />
        <path
          d="M384.023 61.1938C379.517 66.6539 373.925 69.384 367.245 69.384C364.118 69.384 361.282 68.8804 358.737 67.8732C356.192 66.813 353.993 65.3552 352.137 63.4998C350.335 61.5914 348.93 59.3384 347.923 56.7409C346.916 54.0904 346.412 51.1748 346.412 47.9941C346.412 44.7605 346.942 41.7653 348.002 39.0088C349.063 36.2522 350.547 33.8932 352.455 31.9318C354.417 29.9704 356.723 28.4331 359.373 27.3199C362.077 26.2067 365.019 25.65 368.199 25.65C373.341 25.65 377.317 27.0548 380.127 29.8644C382.936 32.621 384.341 36.5968 384.341 41.7919C384.341 42.534 384.182 42.9846 383.864 43.1436C383.599 43.3027 382.936 43.3822 381.876 43.3822H355.715C355.609 43.8063 355.53 44.3364 355.477 44.9725C355.424 45.5556 355.397 46.2183 355.397 46.9604C355.397 49.717 355.715 52.235 356.352 54.5145C357.041 56.7409 357.995 58.6493 359.214 60.2396C360.486 61.8299 361.971 63.0757 363.667 63.9769C365.416 64.8251 367.351 65.2492 369.472 65.2492C371.698 65.2492 373.766 64.7721 375.674 63.8179C377.582 62.8107 379.544 61.1938 381.558 58.9674L384.023 61.1938ZM370.903 39.7244C371.963 39.7244 372.811 39.6979 373.448 39.6449C374.084 39.5919 374.561 39.4859 374.879 39.3268C375.197 39.1678 375.409 38.9558 375.515 38.6907C375.621 38.3726 375.674 37.9751 375.674 37.498C375.674 35.0595 374.879 33.1246 373.289 31.6933C371.751 30.209 369.631 29.4668 366.927 29.4668C361.202 29.4668 357.65 32.886 356.272 39.7244H370.903Z"
          fill="var(--figma-color-text)"
        />
        </g>
      </svg>
    </div>

    <div class="options-container">
      <div class="flex column">
        <label class="label type--medium"><div style="width: 16px" class="icon icon--align-top--xsmall mr-xxxsmall" />Top Crop</label>
        <div class="flex column">
          

          <div class="radio">
         <input type="radio" class="radio__button" id="radioAscender" value="ascender" v-model="top" name="top" />
        <label class="label" for="radioAscender" >Ascender</label>
      </div>
   
        <div class="radio">
         <input type="radio" class="radio__button" id="radioCapHeight" value="capheight" v-model="top" name="top" />
        <label class="label" for="radioCapHeight">Cap height</label>
      </div>

          <div class="radio">
         <input type="radio" class="radio__button" id="radioXHeight" value="xheight" v-model="top" name="top" />
        <label class="label" for="radioXHeight">x-height</label>
      </div>
      
        </div>
      </div>
      <div class="flex column">
        <label class="label type--medium"><div style="width: 16px" class="icon icon--align-bottom--xsmall mr-xxxsmall" /> Bottom</label>
    
        <div class="radio">
         <input type="radio" class="radio__button" id="radioBaseline" value="baseline" v-model="bottom" name="bottom" />
        <label class="label" for="radioBaseline" >Baseline</label>
      </div>
   
        <div class="radio">
         <input type="radio" class="radio__button" id="radioDescender" value="descender" v-model="bottom" name="bottom" />
        <label class="label" for="radioDescender">Descender</label>
      </div>
      
      
 

  

      
      </div>
      <div class="flex column">
        <label class="label type--medium"><div style="width: 16px" class="icon icon--grid mr-xxxsmall" />Round to Grid</label>
        <div class="input input--with-icon input-rounding">
          <div class="icon icon--grid"></div>
          <input
            type="number"
            class="input__field"
            style="text-align: right"
            name="gridSize"
            @input="handleGridSize"
            min="0"
            v-model="gridSize"
          />
        </div>

        <button
          class="button button--primary justify-content-center mt-small"
          :disabled="autoUpdate"
          @click="updateInstances"
        >
          <span>Crop</span>
        </button>

      </div>
    
    </div>
  </div>
</template>

<script>
import "./finch-plugin-ds.css";
import { selectMenu } from "figma-plugin-ds";

import { dispatch, handleEvent } from "./uiMessageHandler";
import { ref, onMounted, computed } from "vue";
import Disclosure from "./components/Disclosure.vue";

const autoUpdate = ref(false);
const updateFrequency = ref(50);
const gridSize = ref(0);
const componentKey = ref("");

const selectionCount = ref(0);

const helperText = computed(() => {
  return selectionCount.value > 0
    ? `You have ${selectionCount.value} instance${
        selectionCount.value > 1 ? "s" : ""
      } selected to crop`
    : `Select one or more instances of Text Crop components`;
});

export default {
  components: {
    Disclosure,
  },
  props: {
    message: "",
  },
  setup(props) {

    const top = ref("capheight");
    const bottom = ref("descender");

    onMounted(() => {
      dispatch("ready");
      selectMenu.init();

      const resizeObserver = new ResizeObserver(function () {
        //dispatch('resizeUI', [app.scrollWidth, app.scrollHeight])
      });
      resizeObserver.observe(app);

      handleEvent("gridSize", (size) => {
        gridSize.value = size;
      });

      handleEvent("componentKey", (key) => {
        componentKey.value = key;
      });

    });
      handleEvent("selection", (selLength) => {
        selectionCount.value = selLength;
      });

    function handleGridSize() {
      dispatch("gridSize", gridSize.value);
    }

    function dispatchUpdate() {
      if (autoUpdate.value === true) {
        dispatch("updateInstances", "clock");
      }
      //dispatch('autoUpdate')
    }

    function handleAutoUpdate() {
      if (autoUpdate.value === true) {
        setTimeout(() => {
          dispatchUpdate();
          handleAutoUpdate();
        }, updateFrequency.value);
      }
    }

    function updateInstances() {
      dispatch("cropProfile", { top: top.value, bottom: bottom.value });
      dispatch("updateInstances");
    }

    function updateLegacies() {
      dispatch("updateLegacies", componentKey.value);
    }
    function swapText() {
      dispatch("swapText", componentKey.value);
    }

    return {
      props,
      updateInstances,
      autoUpdate,
      handleAutoUpdate,
      dispatchUpdate,
      updateFrequency,
      handleGridSize,
      gridSize,
      updateLegacies,
      componentKey,
      swapText,
      helperText,
      selectionCount,
      bottom,
      top,
    };
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>

<style lang="scss">
.error {
  color: var(--red);
  background-color: var(--red2);
}
.success {
  color: var(--black);
  background-color: var(--selection-a);
}

.button--withIcon {
  padding: 0 calc(var(--size-xsmall) + 1px) 0 calc(var(--size-xxsmall) + 1px) !important;
}

#ui {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100px;
}

#updateButtons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: var(--size-xsmall) var(--size-xxsmall);
}

.banner {
  width: 100%;
  padding: var(--size-xxsmall);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  max-height: 48px;
  user-select: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
  max-height: 100px;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  max-height: 0;
}

.onboarding-tip {
  align-items: flex-start;
  padding: 0;
}

.onboarding-tip > .icon {
  margin-right: var(--size-xxsmall);
  min-width: var(--size-medium);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  margin-left: var(--size-xxsmall);
}

.line {
  z-index: -100;
  stroke-width: 2px;
  stroke-opacity: 1;
  stroke: var(--figma-color-border-strong);
  stroke-dasharray: 3 4; 

}
.line-selected {
  stroke: var(--figma-color-border-oncomponent);
  stroke-width: 2px;
  stroke-dasharray: 0; 
}

.options-container {
  display: grid;
  padding: 24px;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  div.flex.column {
    width: 100%;
    justify-self: center;
    padding: 0px 4px;
  }
}

.select-menu,
.select-menu__button {
  width: 100%;
}

.icon {
  background-repeat: no-repeat;
  background-position: center;
}
.button--primary {
  background-color: var(--figma-color-bg-component);
  &:hover{
    background-color: var(--figma-color-bg-component-hover);
  }
  &:active{
    background-color: var(--figma-color-bg-component-pressed);
   
  }
}
.figma-dark {
  .icon {
    filter: invert(1);
  }
}
</style>
