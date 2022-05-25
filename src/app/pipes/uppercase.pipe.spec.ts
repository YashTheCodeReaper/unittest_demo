import { UppercasePipe } from './uppercase.pipe';

// describe a testsuite for uppercase pipe
describe('UppercasePipe', () => {
  // variable to store pipe instance
  let pipe: any;

  // before each test case instantiate the UppercasePipe
  beforeEach(() => {
    pipe = new UppercasePipe();
  });

  // check whether the pipe is created
  it('create an instance of uppercase pipe', () => {
    expect(pipe).toBeTruthy();
  });

  // check the functionality of the pipe
  it('should convert the string to upper case', () => {
    expect(pipe.transform('varsha')).toBe('VARSHA');
  });
});
