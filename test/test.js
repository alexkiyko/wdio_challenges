import { expect } from 'chai';
import axios from 'axios';


describe('webdriver.io page', () => {
  it('should have the right title', () => {
    browser.url('https://webdriver.io')
    const title = browser.getTitle();
    expect(title).include('WebdriverIO · Next-gen browser automation test framework for Node.js');
  });

  it('should get success response',async () => {
    const response = await axios({
      method: 'get',
      url: 'https://webdriver.io',
    })
      .then(res => res)
      .catch(err => err);
    expect(response.status).equal(200);
  });
});
