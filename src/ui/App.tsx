import * as React from 'react';
import {
  NewsKitProvider,
  newskitLightTheme,
  newskitDarkTheme,
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

import {
  useRegisterMessageHandler,
  useEmitMessage,
  useSetOnMessageListener,
} from './hooks';

import {emitMessage} from './messageHandlers';
const accordionOverrides = {
  panel: {
    transitionPreset: [
      {
        extend: 'maxHeightChange',
        base: {
          transitionProperty: 'max-height',
        },
        enterActive: {
          transitionDuration: '200ms',
        },
        exitActive: {
          transitionDuration: '200ms',
        },
      },
    ],
  },
};

export default function App() {
  const rootHtml = document.documentElement;
  const [theme, setTheme] = useState(
    rootHtml.classList.contains('figma-dark')
      ? newskitDarkTheme
      : newskitLightTheme,
  );

  useEffect(() => {
    const themeObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName == 'class') {
          var isDarkMode = (mutation.target as HTMLElement).classList.contains(
            'figma-dark',
          );
          if (isDarkMode) {
            setTheme(newskitDarkTheme);
          } else {
            setTheme(newskitLightTheme);
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
    useEmitMessage('GRID_SIZE', size);
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
        header={gridSize}
        label="Hide"
        overrides={accordionOverrides}
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
            <Label htmlFor="top-crop" overrides={{}}>
              Top - {topCrop}
            </Label>

            <Select id="top-crop" onChange={handleTopCrop} size="small">
              <SelectOption key="ascender" value="ascender">
                Ascender
              </SelectOption>
              <SelectOption key="capheight" value="capheight">
                Cap Height
              </SelectOption>
              <SelectOption key="xheight" value="xheight">
                X Height
              </SelectOption>
            </Select>

            <Label htmlFor="bottom-crop" size="small">
              Bottom - {bottomCrop}
            </Label>
            <Select id="bottom-crop" size="small" onChange={handleBottomCrop}>
              <SelectOption value="baseline" defaultSelected>
                Baseline
              </SelectOption>

              <SelectOption value="descender">Descender</SelectOption>
            </Select>

            <>
              <Label>Rounding</Label>
              <TextField
                size="small"
                type="number"
                onInput={handleGridSize}
                value={gridSize}
              />
              <TextBlock typographyPreset="utilityLabel010">
                Rounds cropped text to a grid unit
              </TextBlock>
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
