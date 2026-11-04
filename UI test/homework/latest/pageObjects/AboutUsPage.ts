import { Page, Locator } from '@playwright/test';
import { HelperBase } from '../Helper/helperBase';

export class AboutUsPage extends HelperBase {
  readonly pageTitle: Locator;
  readonly videoContainer: Locator;
  readonly videoIframe: Locator;
  readonly playButton: Locator;
  readonly video: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h1, .page-title, [class*="title"]:has-text("За нас"), [class*="title"]:has-text("About")');
    this.videoContainer = page.locator('.video-container, [class*="video"], .video-wrapper, iframe[src*="youtube"], iframe[src*="vimeo"], iframe[src*="video"]');
    this.videoIframe = page.locator('iframe[src*="youtube"], iframe[src*="vimeo"], iframe[src*="video"], iframe[src*="player"]');
    this.playButton = page.locator('button[aria-label*="play"], button[aria-label*="Play"], .play-button, [class*="play"], .video-play');
    this.video = page.locator('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
  }

  async navigate() {
    await this.page.goto('https://www.sportdepot.bg/pages/about-us-80');
    await this.page.waitForLoadState('domcontentloaded');
    
   
    try {
      const cookieButton = await this.page.locator('button:has-text("Приемам"), #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').first().isVisible({ timeout: 3000 });
      if (cookieButton) {
        await this.page.locator('button:has-text("Приемам"), #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').first().click();
        await this.waitForNumberOfSeconds(1);
      }
    } catch (e) {
      
    }
    
    await this.page.waitForLoadState('networkidle');
  }

  async hasVideo(): Promise<boolean> {
    try {
      
      const videoVisible = await this.video.first().isVisible({ timeout: 3000 });
      if (videoVisible) {
        return true;
      }
      
      
      const iframeVisible = await this.videoIframe.first().isVisible({ timeout: 3000 });
      if (iframeVisible) {
        return true;
      }
      
      
      const containerVisible = await this.videoContainer.first().isVisible({ timeout: 3000 });
      return containerVisible;
    } catch {
      return false;
    }
  }

  async playVideo() {
    try {
      
      await this.waitForNumberOfSeconds(2);
      
      
      const playBtnVisible = await this.playButton.first().isVisible({ timeout: 5000 }).catch(() => false);
      if (playBtnVisible) {
        await this.playButton.first().scrollIntoViewIfNeeded();
        await this.playButton.first().click();
        await this.waitForNumberOfSeconds(3);
        return true;
      }
      
      
      const videoVisible = await this.video.first().isVisible({ timeout: 5000 }).catch(() => false);
      if (videoVisible) {
        const videoElement = this.video.first();
        await videoElement.scrollIntoViewIfNeeded();
        const tagName = await videoElement.evaluate(el => el.tagName.toLowerCase());
        
        if (tagName === 'iframe') {
          
          await videoElement.click({ timeout: 5000 });
          await this.waitForNumberOfSeconds(3);
          

          try {
            const frame = await videoElement.contentFrame();
            if (frame) {
              const playBtn = frame.locator('button[aria-label*="play"], .ytp-play-button, .vjs-play-control').first();
              const playBtnInFrame = await playBtn.isVisible({ timeout: 3000 }).catch(() => false);
              if (playBtnInFrame) {
                await playBtn.click();
                await this.waitForNumberOfSeconds(3);
                return true;
              }
              
              
              const box = await videoElement.boundingBox();
              if (box) {
                await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
                await this.waitForNumberOfSeconds(3);
                return true;
              }
            }
          } catch (e) {
            
          }
          
          return true;
        } else if (tagName === 'video') {
          
          await videoElement.evaluate((video: HTMLVideoElement) => {
            video.play().catch(() => {
              
              video.click();
            });
          });
          await this.waitForNumberOfSeconds(3);
          
          
          await videoElement.click();
          await this.waitForNumberOfSeconds(2);
          return true;
        }
      }
      
      
      const containerVisible = await this.videoContainer.first().isVisible({ timeout: 5000 }).catch(() => false);
      if (containerVisible) {
        await this.videoContainer.first().scrollIntoViewIfNeeded();
        await this.videoContainer.first().click();
        await this.waitForNumberOfSeconds(3);
        return true;
      }
    } catch (e) {
      
    }
    
    return false;
  }
}


