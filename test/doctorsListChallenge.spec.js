/**
 Description
 Feature: Врачи › Страница выдачи врачей: Фильтр "Расписание" на выдаче врачей
 Scenario : Выбор дня
 Given Открыта страница сайта "/doctor"
 Then Отображаются 10 карточек врачей на странице
 Then Отображается кнопка "Расписание (фильтр)"
 Then Заголовок кнопки ”Расписание (фильтр)" содержит текст """Расписание на все дни"""
 When Нажимаем на кнопку  "Расписание (фильтр)"
 Then Отображается элемент "Список значений для выбора даты"
 Then Помечен галочкой пункт "Все дни" в выпадающем списке "Список значений для выбора даты"
 When Нажимаем на пункт "Завтра" в выпадающем списке "Список значений для выбора даты"
 Then Заголовок кнопки "Расписание (фильтр)" содержит текст""" Расписание на завтра"""
 Then Отображаются 10 карточек врачей на странице
 Then Отображаются врачи, работающие в выбранный день
 */

import { expect } from 'chai';


describe('Doctors list time schedule', function () {
  before('Load page', function () {
    browser.maximizeWindow();
    browser.url('https://docdoc.ru/doctor');
  });

  it('should display list of 10 doctors', function () {
    const doctors = $$('//div[@data-test-id="doctor-card-search-results"]');
    const doctorsCount = doctors.length;
    expect(doctorsCount).equals(10);
  });

  it('should display schedule button', function () {
    const scheduleBtn = $('//div[@data-test-id="filters"]//button[@data-test-id="calendar-button"]');
    expect(scheduleBtn.isDisplayed()).true;
  });

  it('schedule button should have a name "Расписание на все дни"', function () {
    const scheduleBtn = $('//div[@data-test-id="filters"]//button[@data-test-id="calendar-button"]');
    expect(scheduleBtn.getText()).contains('Расписание на все дни');
  });

  it('when press on schedule button should display dropdown list', function () {
    const scheduleBtn = $('//div[@data-test-id="filters"]//button[@data-test-id="calendar-button"]');
    const dropdownList = $('//div[@data-test-id="date_select_items"]');
    scheduleBtn.scrollIntoView();
    browser.pause(500);
    scheduleBtn.click();
    dropdownList.waitForDisplayed();
    expect(dropdownList.isDisplayed()).true;
  });

  it('should verify "Все дни" is selected  ', function () {
    const elementClass = $('//button[@data-test-id="date_select"]').getAttribute('class');
    expect(elementClass.includes('active')).true;
  });

  it('when press "Завтра" button should verify schedule button name has changed  to "Расписание на завтра"', function () {
    const scheduleBtn = $('//div[@data-test-id="filters"]//button[@data-test-id="calendar-button"]');
    const tomorrowButton = $('//div[@data-test-id="date_select_items"]//button[@data-test-id="calendar-item.1"]');
    tomorrowButton.click();
    browser.pause(1000);
    expect(scheduleBtn.getText()).contains('Расписание на завтра');
  });

  it('should display list of 10 doctors', function () {
    const doctors = $$('//div[@data-test-id="doctor-card-search-results"]');
    let doctorsCount = doctors.length;
    expect(doctorsCount).equals(10);
  });

  // it('debug schedule time for every doctor', function () {
  //   const scheduleText = $$('//div[@class="doctor-slots__caption"]/span');
  //   scheduleText.forEach(el => console.log(el.getText()));
  // });

  it('SOLUTION 1 should loop through every doctors card and verify schedule time', function () {
    const allDoctors = $$('//div[@data-test-id="doctor-card-search-results"]');
    for (let i = 1; i <= allDoctors.length; i++) {
      const scheduleTimeButton = $(`(//div[@data-test-id="doctor-card-search-results"])[${i}]//button[@data-ga-action="clickTable"]`);
      const scheduleText = $(`(//div[@data-test-id="doctor-card-search-results"])[${i}]//div[@class="doctor-slots__caption"]/span`);
      if (scheduleTimeButton.isDisplayed()) {
        expect(scheduleText.getText()).to.include('Онлайн-расписание на');
        // console.log(scheduleText.getText());
      } else {
        // console.log(scheduleText.getText())
      }
    }
  });

  it('SOLUTION 2 should loop through every doctors card and verify schedule time', function () {
    const allDoctors = $$('//div[@data-test-id="doctor-card-search-results"]');
    for (let i = 1; i <= allDoctors.length; i++) {
      const scheduleTimeButtons = $$(`(//div[@data-test-id="doctor-card-search-results"])[${i}]//button[@data-ga-action="clickTable"]`).length;
      const scheduleText = $(`(//div[@data-test-id="doctor-card-search-results"])[${i}]//div[@class="doctor-slots__caption"]/span`);
      if (scheduleTimeButtons > 0) {
        expect(scheduleText.getText()).to.include('Онлайн-расписание на');
        // console.log(scheduleText.getText());
      } else {
        // console.log(scheduleText.getText());
      }
    }
  });
});
