import { YoutubeConfig } from '@/core';
import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer';
import {
  ClickUploadButtonErrorException,
  ClickSelectedChannelErrorException,
  GoToYoutubeStdioErrorException,
  InsertEmailErrorException,
  InsertPasswordErrorException,
  NotFoundChannelByNameException,
  OpenChannelSelectMenuErrorException,
  OpenTopAccountMenuErrorException,
  UploadFileErrorException,
  WriteVideoDescriptionErrorException,
} from './exceptions';
import { Video } from './types';

export class YoutubeUploader {
  private browser: Browser;
  private page: Page;

  constructor(private readonly credentials: YoutubeConfig) {}

  async run(video: Video, options?: PuppeteerLaunchOptions): Promise<void> {
    this.browser = await puppeteer.launch(options);
    this.page = await this.browser.newPage();

    await this.goToYoutubeStudio();
    await this.insertEmail();
    await this.insertPassword();
    await this.openTopAccountMenu();
    await this.openChannelSelectMenu();
    await this.clickSelectedChannel();
    await this.clickUploadButton();
    await this.uploadFile(video.path);
    await this.writeVideoDescription(video);
  }

  private async goToYoutubeStudio() {
    try {
      await this.page.goto('https://studio.youtube.com');
    } catch (e) {
      throw new GoToYoutubeStdioErrorException(e);
    }
  }

  private async insertEmail() {
    try {
      const form = await this.page.waitForSelector('form');
      await form.$eval(
        'input[type = email]',
        (element, [email]) => element.setAttribute('value', email),
        [this.credentials.email],
      );
      const div = await this.page.waitForSelector('#identifierNext');
      await div.$eval('button', (element) => element.click());
    } catch (e) {
      throw new InsertEmailErrorException(e);
    }
  }

  private async insertPassword() {
    try {
      const form = await this.page.waitForSelector('#password');
      await form.$eval(
        'input[type = password]',
        (element, [password]) => element.setAttribute('value', password),
        [this.credentials.password],
      );
      const div = await this.page.waitForSelector('#passwordNext');
      await div.$eval('button', (element) => element.click());
    } catch (e) {
      throw new InsertPasswordErrorException(e);
    }
  }

  private async openTopAccountMenu() {
    try {
      const container = await this.page.waitForSelector('#main-container');
      const header = await container.waitForSelector('header');
      const button = await header.waitForSelector('#account-button');
      await button.$eval('#avatar-btn', (element: HTMLButtonElement) =>
        element.click(),
      );
    } catch (e) {
      throw new OpenTopAccountMenuErrorException(e);
    }
  }

  private async openChannelSelectMenu() {
    try {
      const wrapper = await this.page.waitForSelector('#contentWrapper');
      const container = await wrapper.waitForSelector('#container');
      const sections = await container.waitForSelector('#sections');
      const div = await sections.waitForSelector('#items');
      await div.$eval(
        'ytd-compact-link-renderer:nth-child(3)',
        (element: HTMLAnchorElement) => element.click(),
      );
    } catch (e) {
      throw new OpenChannelSelectMenuErrorException(e);
    }
  }

  private async clickSelectedChannel() {
    try {
      const wrapper = await this.page.waitForSelector('#contentWrapper');
      const submenu = await wrapper.waitForSelector('#submenu');
      const container = await submenu.waitForSelector('#container');
      const section = await container.waitForSelector('#sections');
      const contents = await section.waitForSelector('#contents');

      const nth = await contents.$eval(
        '#contents',
        (element: HTMLDivElement, [channelName]) => {
          return [...element.querySelectorAll('#channel-title')].reduce<number>(
            (prev, div, i) => {
              if (div.innerHTML === channelName) {
                prev = i + 1;
              }

              return prev;
            },
            0,
          );
        },
        [this.credentials.channelName],
      );

      if (nth === 0) {
        throw new NotFoundChannelByNameException();
      }

      await contents.$eval(
        `ytd-account-item-renderer:nth-child(${nth})`,
        (element: HTMLElement) => element.click(),
      );
    } catch (e) {
      throw new ClickSelectedChannelErrorException(e);
    }
  }

  async clickUploadButton(): Promise<void> {
    try {
      const main = await this.page.waitForSelector('#main');
      const container = await main.waitForSelector('#page-title-container');
      const actions = await container.waitForSelector('#dashboard-actions');
      await actions.$eval('#upload-icon', (element: HTMLButtonElement) =>
        element.click(),
      );
    } catch (e) {
      throw new ClickUploadButtonErrorException(e);
    }
  }

  async uploadFile(path: string): Promise<void> {
    try {
      const button = await this.page.waitForSelector('#select-files-button');

      const [fileChooser] = await Promise.all([
        this.page.waitForFileChooser(),
        button.click(),
      ]);

      await fileChooser.accept([path]);
    } catch (e) {
      throw new UploadFileErrorException(e);
    }
  }

  async writeVideoDescription(video: Video) {
    try {
      let url = '';

      while (!url) {
        const anchor = await this.page.waitForSelector('span.ytcp-video-info');
        url = await anchor.$eval('a', (element) =>
          element.innerText.startsWith('https') ? element.innerText : '',
        );

        /** @TODO break after processing */
      }

      if (video.title) {
        const textBox = await this.page.waitForSelector('#title-textarea');
        const inputDiv = await textBox.waitForSelector('#child-input');
        await inputDiv.$eval(
          '#textbox',
          (element: HTMLDivElement, [title]) => (element.innerHTML = title),
          [video.title],
        );
      }

      if (video.description) {
        const textBox = await this.page.waitForSelector(
          '#description-textarea',
        );
        const inputDiv = await textBox.waitForSelector('#child-input');
        await inputDiv.$eval(
          '#textbox',
          (element: HTMLDivElement, [description]) =>
            (element.innerText = description),
          [video.description],
        );
      }

      for (let i = 0; i < 3; i++) {
        if (i === 0) {
          await this.page.evaluate(() => {
            const noKidsDiv = document.getElementsByName(
              'VIDEO_MADE_FOR_KIDS_NOT_MFK',
            )[0];

            const noKidsRadio = noKidsDiv.querySelector(
              '#radioContainer',
            ) as HTMLDivElement;
            noKidsRadio.click();
          });
        }

        if (i === 3) {
          await this.page.evaluate(() => {
            const saveOrPostDiv = document.getElementsByName(
              'FIRST_CONTAINER',
            )[0] as HTMLDivElement;

            const saveOrPostRadio = saveOrPostDiv.querySelector(
              '#radioContainer',
            ) as HTMLDivElement;

            saveOrPostRadio.click();

            const publicDiv = document.getElementsByName(
              'PUBLIC',
            )[0] as HTMLDivElement;

            const publicRadio = publicDiv.querySelector(
              '#radioContainer',
            ) as HTMLDivElement;

            publicRadio.click();
          });
        }

        const next = await this.page.waitForSelector('#next-button');
        await next.$eval('div', (element) => element.click());
      }

      const done = await this.page.waitForSelector('#done-button');
      await done.$eval('div', (element) => element.click());
    } catch (e) {
      throw new WriteVideoDescriptionErrorException(e);
    }
  }
}
