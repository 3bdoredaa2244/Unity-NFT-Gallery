import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import deployFixture from "./deployFixture";

describe("Marketplace buyMarketItem tests", () => {
  it("Should not allow buying an item that isn't in the marketplace", async () => {
    const { MarketplaceContract, Alice } = await loadFixture(deployFixture);

    await expect(
      MarketplaceContract.connect(Alice).buyMarketItem(0)
    ).be.revertedWithCustomError(MarketplaceContract, "ItemNotInMarketplace");
  });

  it("Should allow buying an item", async () => {
    const { MarketplaceContract, Alice, Bob, ArtworkContract } =
      await loadFixture(deployFixture);

    await expect(
      MarketplaceContract.connect(Alice).listMarketItem(
        ArtworkContract.address,
        0,
        ethers.utils.parseEther("0.1"),
        { value: ethers.utils.parseEther("0.01") }
      )
    ).not.be.reverted;

    await expect(
      MarketplaceContract.connect(Bob).buyMarketItem(0, {
        value: ethers.utils.parseEther("0.1"),
      })
    ).not.be.reverted;
  });

  it("Should not allow buying an item that is already sold", async () => {
    const { MarketplaceContract, Alice, Bob, ArtworkContract } =
      await loadFixture(deployFixture);

    await expect(
      MarketplaceContract.connect(Alice).listMarketItem(
        ArtworkContract.address,
        0,
        ethers.utils.parseEther("0.1"),
        { value: ethers.utils.parseEther("0.01") }
      )
    ).not.be.reverted;

    await expect(
      MarketplaceContract.connect(Bob).buyMarketItem(0, {
        value: ethers.utils.parseEther("0.1"),
      })
    ).not.be.reverted;

    await expect(
      MarketplaceContract.connect(Bob).buyMarketItem(0, {
        value: ethers.utils.parseEther("0.1"),
      })
    ).be.revertedWithCustomError(MarketplaceContract, "ItemAlreadySold");
  });

  it("Should not allow buying an item for less than the selling price", async () => {
    const { MarketplaceContract, Alice, Bob, ArtworkContract } =
      await loadFixture(deployFixture);

    await expect(
      MarketplaceContract.connect(Alice).listMarketItem(
        ArtworkContract.address,
        0,
        ethers.utils.parseEther("0.1"),
        { value: ethers.utils.parseEther("0.01") }
      )
    ).not.be.reverted;

    await expect(
      MarketplaceContract.connect(Bob).buyMarketItem(0, {
        value: ethers.utils.parseEther("0.05"),
      })
    ).be.revertedWithCustomError(MarketplaceContract, "ValueNotPurchasePrice");
  });
});
