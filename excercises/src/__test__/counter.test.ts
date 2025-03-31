import { setupCounter } from '../counter';

describe('setupCounter', () => {
  let button: HTMLButtonElement;

  beforeEach(() => {
    // Tạo một button giả để test
    button = document.createElement('button');
    document.body.appendChild(button);
  });

  afterEach(() => {
    // Dọn dẹp sau mỗi test
    document.body.removeChild(button);
  });

  it('should initialize the counter to 0', () => {
    setupCounter(button);

    // Kiểm tra nội dung ban đầu của button
    expect(button.innerHTML).toBe('count is 0');
  });

  it('should increment the counter when the button is clicked', () => {
    setupCounter(button);

    // Giả lập nhấn button
    button.click();

    // Kiểm tra nội dung sau khi nhấn
    expect(button.innerHTML).toBe('count is 1');
  });

  it('should increment the counter correctly after multiple clicks', () => {
    setupCounter(button);

    // Giả lập nhấn button nhiều lần
    button.click();
    button.click();
    button.click();

    // Kiểm tra nội dung sau nhiều lần nhấn
    expect(button.innerHTML).toBe('count is 3');
  });
});