import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import puppeteer, { Page, PuppeteerLaunchOptions } from 'puppeteer';
import { ConfigKey, YoutubeConfig } from '@/core';

@Injectable()
export class YoutubeService {
  private readonly credentials: YoutubeConfig;

  constructor(private readonly configService: ConfigService) {
    this.credentials = this.configService.get<YoutubeConfig>(ConfigKey.Youtube);
  }

  private async goToStudio(page: Page): Promise<void> {
    try {
      await page.goto('https://studio.youtube.com');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private async inputEmail(page: Page): Promise<void> {
    try {
      const form = await page.waitForSelector('form');
      await form.$eval(
        'input[type = email]',
        (element, [email]) => element.setAttribute('value', email),
        [this.credentials.email],
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private async clickEmailNextButton(page: Page): Promise<void> {
    try {
      const div = await page.waitForSelector('#identifierNext');
      await div.$eval('button', (element) => element.click());
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private async inputPassword(page: Page): Promise<void> {
    try {
      const div = await page.waitForSelector('#password');
      await div.$eval(
        'input[type = password]',
        (element, [password]) => element.setAttribute('value', password),
        [this.credentials.password],
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private async clickPasswordNextButton(page: Page): Promise<void> {
    try {
      const div = await page.waitForSelector('#passwordNext');
      await div.$eval('button', (element) => element.click());
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private async clickProfileAvatar(page: Page): Promise<void> {
    try {
      const container = await page.waitForSelector('#main-container');
      const header = await container.waitForSelector('header');
      const button = await header.waitForSelector('#account-button');
      await button.$eval('#avatar-btn', (element: HTMLButtonElement) =>
        element.click(),
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private async clickAccountChange(page: Page) {
    try {
      const wrapper = await page.waitForSelector('#contentWrapper');
      const container = await wrapper.waitForSelector('#container');
      const sections = await container.waitForSelector('#sections');
      const div = await sections.waitForSelector('#items');
      await div.$eval(
        'ytd-compact-link-renderer:nth-child(3)',
        (element: HTMLAnchorElement) => element.click(),
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private async selecChannel(page: Page) {
    try {
      const wrapper = await page.waitForSelector('#contentWrapper');
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
        throw new NotFoundException();
      }

      await contents.$eval(
        `ytd-account-item-renderer:nth-child(${nth})`,
        (element: HTMLElement) => element.click(),
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async open(options?: PuppeteerLaunchOptions) {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await this.goToStudio(page);

    await this.inputEmail(page);
    await this.clickEmailNextButton(page);

    await this.inputPassword(page);
    await this.clickPasswordNextButton(page);

    await this.clickProfileAvatar(page);
    await this.clickAccountChange(page);
    await this.selecChannel(page);
  }
}
