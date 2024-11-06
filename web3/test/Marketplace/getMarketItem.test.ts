import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import deployFixture from "./deployFixture";

describe("Marketplace getMarketItem tests", () => {
  it("Should not allow getting item that isn't in the Marketplace", async () => {
    const { MarketplaceContract, Alice } = await loadFixture(deployFixture);

    await expect(
      MarketplaceContract.connect(Alice).getMarketItem(0)
    ).be.revertedWithCustomError(MarketplaceContract, "ItemNotInMarketplace");
  });

  it("Should allow getting an item that does exist", async () => {
    const { MarketplaceContract, Alice, ArtworkContract } = await loadFixture(
      deployFixture
    );

    await expect(
      MarketplaceContract.connect(Alice).listMarketItem(
        ArtworkContract.address,
        0,
        ethers.utils.parseEther("0.1"),
        { value: ethers.utils.parseEther("0.01") }
      )
    ).not.be.reverted;

    await expect(MarketplaceContract.connect(Alice).getMarketItem(0)).not.be
      .reverted;
  });
});
