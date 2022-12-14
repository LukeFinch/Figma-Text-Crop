import * as React from 'react';
import {
  NewsKitProvider,
  GridLayout,
  Label,
  SelectOption,
  Global,
  getColorCssFromTheme,
  css,
  compileTheme,
  TextField,
  Button,
  Accordion,
  Select,
  Block,
  TextBlock,
} from 'newskit';
import {useState, useEffect} from 'react';
import {lightTheme, darkTheme} from './themes';
import {
  useRegisterMessageHandler,
  useEmitMessage,
  useSetOnMessageListener,
} from './hooks';

import {emitMessage} from './messageHandlers';

export default function App() {
  const rootHtml = document.documentElement;
  const [theme, setTheme] = useState(
    rootHtml.classList.contains('figma-dark') ? darkTheme : lightTheme,
  );
  const [darkMode, setDarkMode] = useState<boolean>(
    rootHtml.classList.contains('figma-dark'),
  );

  useEffect(() => {
    const themeObserver = new MutationObserver(function (mutations) {
      console.log('mutation', darkMode ? 'dark' : 'light');
      mutations.forEach(function (mutation) {
        if (mutation.attributeName == 'class') {
          console.log(mutation);
          if (
            (mutation.target as HTMLElement).classList.contains('figma-dark')
          ) {
            setDarkMode(true);
            setTheme(darkTheme);
          } else {
            setDarkMode(false);
            setTheme(darkTheme);
          }
        }
      });
    });
    themeObserver.observe(rootHtml, {attributes: true});
  }, []);

  const [openOptions, setOpenOptions] = useState(true);

  interface Options {
    gridSize: string;
    topCrop: string;
    bottomCrop: string;
  }

  //TODO: Setup fetching saved preferences
  // const getDefaultOptions = new Promise<Options>((resolve, reject) => {
  //   emitMessage('GET_OPTIONS');
  //   const handleOptions = async (options: Options) => {
  //     resolve(options);
  //   };

  //   const waitForOptions = useRegisterMessageHandler(
  //     'GET_OPTIONS',
  //     handleOptions,
  //   );

  //   setTimeout(reject, 5000);
  // });

  useEffect(() => {
    const rootElement = document.getElementById('root');
    let rect = rootElement?.getBoundingClientRect();
    rect &&
      emitMessage('RESIZE_UI', {
        width: rootElement?.offsetWidth,
        height: rootElement?.scrollHeight,
      });
  }, [openOptions]);

  const [gridSize, setGridSize] = useState<string>('1');

  //Listens for incoming messages that match Registered Messages
  useSetOnMessageListener();

  useEmitMessage('UI_READY');

  useRegisterMessageHandler('GRID_SIZE', size => {
    setGridSize(size);
  });

  const handleGridSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    let size = event.target.value;
    setGridSize(size);
    emitMessage('GRID_SIZE', size);
  };

  const [topCrop, setTopCrop] = useState('capheight');
  const [bottomCrop, setBottomCrop] = useState('baseline');

  const handleTopCrop = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopCrop(event.target.value);
  };
  const handleBottomCrop = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBottomCrop(event.target.value);
  };

  const handleCropButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    emitMessage('GRID_SIZE', gridSize);
    emitMessage('CROP_PROFILE', {top: topCrop, bottom: bottomCrop});
    emitMessage('CROP_INSTANCES');
  };

  useRegisterMessageHandler('GRID_SIZE', size => setGridSize(size));

  return (
    <NewsKitProvider theme={theme}>
      <Global
        styles={css`
          *,
          ::after,
          ::before {
            box-sizing: border-box;
          }
          input::-webkit-inner-spin-button,
          input::-webkit-outer-spin-button {
            display: none;
          }
          body {
            margin: 0;
            ${getColorCssFromTheme(
              'background',
              'interface010',
            )({theme: compileTheme(theme)})};
          }
        `}
      />

      <Accordion
        header="Options"
        onChange={isOpen => setOpenOptions(isOpen)}
        expanded={openOptions}
      >
        {
          <GridLayout
            autoColumns={{xs: '1fr 1fr'}}
            rowGap="space040"
            columnGap="space030"
            overrides={{marginBlock: 'space040', marginInline: 'space030'}}
            alignItems="center"
          >
            <Label htmlFor="top-crop" overrides={{spaceStack: '0'}}>
              Top
            </Label>

            <Select
              id="top-crop"
              onChange={handleTopCrop}
              size="small"
              value={topCrop}
              overrides={{
                panel: {
                  stylePreset: {
                    xs: darkMode ? 'selectPanelCustom' : 'selectPanel',
                  },
                },
              }}
            >
              <SelectOption key="ascender" value="ascender">
                Ascender
              </SelectOption>
              <SelectOption key="capheight" value="capheight" defaultSelected>
                Cap Height
              </SelectOption>
              <SelectOption key="xheight" value="xheight">
                X Height
              </SelectOption>
            </Select>

            <Label htmlFor="bottom-crop" overrides={{spaceStack: '0'}}>
              Bottom
            </Label>
            <Select
              id="bottom-crop"
              size="small"
              onChange={handleBottomCrop}
              value={bottomCrop}
            >
              <SelectOption value="baseline" defaultSelected>
                Baseline
              </SelectOption>

              <SelectOption value="descender">Descender</SelectOption>
            </Select>

            <>
              <Label html-for="grid-size" overrides={{spaceStack: '0'}}>
                Rounding
              </Label>
              <TextBlock
                typographyPreset="utilityLabel010"
                stylePreset="inkSubtle"
              >
                Sets the height of the container to the nearest unit
              </TextBlock>
              <TextField
                id="grid-size"
                size="small"
                type="number"
                min="0"
                onInput={handleGridSize}
                value={gridSize}
              />
            </>
          </GridLayout>
        }
      </Accordion>
      <Block paddingBlock="space040" paddingInline="space030">
        <Button
          size="medium"
          overrides={{width: '100%'}}
          onClick={handleCropButtonClick}
        >
          Crop
        </Button>
      </Block>
    </NewsKitProvider>
  );
}
