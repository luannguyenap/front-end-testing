// scrollToTop.test.ts
import { useScrollToTop } from '../utils/2.scrollToTop';
describe('useScrollToTop', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
    mockElement.scrollTo = jest.fn(); // Mock scrollTo method
    Object.defineProperty(document.documentElement, 'scrollTo', {
      value: jest.fn(), // Mock scrollTo on document.documentElement
      writable: true,
    });
  });

  it('should call scrollTo with default options on document.documentElement', () => {
    const { scrollToTop } = useScrollToTop();
    const scrollToSpy = jest.spyOn(document.documentElement, 'scrollTo');

    scrollToTop();

    expect(scrollToSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  });

  it('should call scrollTo on a custom element', () => {
    const { scrollToTop } = useScrollToTop(mockElement);

    scrollToTop();

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  });

  it('should call scrollTo with custom options', () => {
    const customOptions: ScrollOptions = { behavior: 'auto' };
    const { scrollToTop } = useScrollToTop(mockElement, customOptions);

    scrollToTop();

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      behavior: 'auto',
      top: 0,
      left: 0,
    });
  });

  it('should handle invalid element gracefully', () => {
    const invalidElement: any = null;
    const { scrollToTop } = useScrollToTop(invalidElement);

    expect(() => scrollToTop()).toThrowError();
  });
});