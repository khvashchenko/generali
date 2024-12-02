import $ from 'jquery';
import 'ion-rangeslider';

export const initializeRangSwiper = () => {
  document.addEventListener('DOMContentLoaded', function () {
    function initializeSlider(selector, options) {
      return $(selector).ionRangeSlider(options).data('ionRangeSlider');
    }

    const monthValues = [
      '1 month',
      '3 month',
      '6 month',
      '9 month',
      '12 month',
    ];
    const monthValueMap = monthValues.map((value) => parseInt(value));

    function updateResult() {
      const monthValue = monthValueMap[monthSliderInstance.result.from];
      const moneyValue = moneySliderInstance.result.from;

      const total = function (monthValue, moneyValue) {
        const monthlyInterestRate = 0.05;
        let total = moneyValue;

        for (let i = 0; i < monthValue; i++) {
          total += total * monthlyInterestRate;
        }

        return total.toFixed(0);
      };

      const resultElement = document.querySelector('.calculator__result--sum');

      setTimeout(() => {
        resultElement.textContent = ' € ' + total(monthValue, moneyValue);
      }, 500);
    }

    const monthSliderInstance = initializeSlider('.calculator__month', {
      skin: 'round',
      grid: true,
      min: 0,
      max: monthValues.length - 1,
      step: 1,
      values: monthValues,
      onChange: function () {
        updateResult();
      },
      onFinish: function () {
        updateResult();
      },
    });

    const moneySliderInstance = initializeSlider('.calculator__money', {
      skin: 'round',
      grid: true,
      min: 300,
      max: 15000,
      step: 100,
      from: 2000,
      postfix: ' €',
      onChange: function () {
        updateResult();
      },
      onFinish: function () {
        updateResult();
      },
    });

    updateResult();
  });
}
