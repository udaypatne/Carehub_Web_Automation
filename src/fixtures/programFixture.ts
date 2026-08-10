
import { test as proTest, expect } from '../fixtures/page';
import {CareProgramPage2} from "../pages/Program/CareProgramPage2"
import { ProtocolPage } from "../pages/Program/ProtocolPage"

type pageFixtures = {
    careProgramPage2:CareProgramPage2 ,
    protocolPage :ProtocolPage; 
}

export let test= proTest.extend<pageFixtures>({
    careProgramPage2: async ({ page }, use) => {
        let careProgramPage2 = new CareProgramPage2(page);
        await use(careProgramPage2);
    },

    protocolPage: async ({ page }, use) => {
        let protocolPage = new ProtocolPage(page);
        await use(protocolPage);
    },
});
export { expect };