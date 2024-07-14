const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappcord", function () {
  let dappcord, deployer, user;

  const NAME = "Dappcord";
  const SYMBOL = "DC";

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();
    // Deploy Contract
    const Dappcord = await ethers.getContractFactory("Dappcord");
    dappcord = await Dappcord.deploy(NAME, SYMBOL);
  })

  describe('Deployment', () => {
    it("Sets the name", async () => {
      let result = await dappcord.name();
      expect(result).to.equal(NAME);
    })

    it("Sets the symbol", async () => {
      result = await dappcord.symbol();
      expect(result).to.equal(SYMBOL);
    })

    it("Sets the owner", async () => {
      const result = await dappcord.owner();
      expect(result).to.equal(deployer.address);
    })
  })
})
