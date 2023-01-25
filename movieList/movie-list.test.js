const {Builder, Capabilities, By} = require('selenium-webdriver');
require('chromedriver');
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
    await driver.get('http://localhost:5500/movieList/index.html')
});

afterAll(async () => {
    await driver.quit()
});

test('verify checked class gets added to movie span when clicked', async () => {
    await driver.findElement(By.xpath("//input")).sendKeys("Little Giants");
    await driver.findElement(By.xpath("//button")).click();

    const span = await driver.findElement(By.xpath("//li/span"));
    await span.click();
    const spanClass = await span.getAttribute("class");

    expect(spanClass).toEqual("checked");

    await driver.findElement(By.id("LittleGiants")).click();
});

test('verify movie gets removed when delete button is clicked', async() => {
    await driver.findElement(By.xpath("//input")).sendKeys("Little Giants");
    await driver.findElement(By.xpath("//button")).click();
    

    await driver.findElement(By.id("LittleGiants")).click();

    const listItems = await driver.findElements(By.css('li'));

    expect(listItems).toHaveLength(0);
});

test('check if message gets displayed when checking off a movie', async() => {
    await driver.findElement(By.xpath("//input")).sendKeys("Little Giants");
    await driver.findElement(By.xpath("//button")).click();

    const span = await driver.findElement(By.xpath("//li/span"));

    // if any message was already displayed, make sure that it has time to go away before making it show again
    await driver.sleep(3000);
    await span.click();
    const messageIsDisplayed = await driver.findElement(By.id("message")).isDisplayed();

    expect(messageIsDisplayed).toEqual(true);

    await driver.findElement(By.id("LittleGiants")).click();
});