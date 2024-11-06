import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import deployFixture from "./deployFixture";

describe("Marketplace initializer tests", () => {
  it("Should not allow re-initializing", async () => {
    const { MarketplaceContract } = await loadFixture(deployFixture);

    await expect(MarketplaceContract.initialize()).to.be.reverted;
  });
});
