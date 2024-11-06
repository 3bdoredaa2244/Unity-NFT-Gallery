import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import deployFixture from "./deployFixture";

describe("Marketplace listMarketItem tests", () => {
  it("Should not allow the listing of an NFT by someone who doesn't own it", async () => {
    const { MarketplaceContract, Alice, ArtworkContract } = await loadFixture(
      deployFixture
    );

    await expect(
      MarketplaceContract.connect(Alice).listMarketItem(
        ArtworkContract.address,
        1,
        ethers.utils.parseEther("0.1")
      )
    ).to.be.revertedWithCustomError(
      MarketplaceContract,
      "OnlyOwnerCanListItem"
    );
  });

  it("Should not allow listing with a value lower than the listing price", async () => {
    const { MarketplaceContract, Alice, ArtworkContract } = await loadFixture(
      deployFixture
    );

    await expect(
      MarketplaceContract.connect(Alice).listMarketItem(
        ArtworkContract.address,
        0,
        ethers.utils.parseEther("0.005")
      )
    ).to.be.revertedWithCustomError(
      MarketplaceContract,
      "ValueNotListingPrice"
    );
  });

  it("Should not allow listing with a value lower than the listing price", async () => {
    const { MarketplaceContract, Alice, ArtworkContract } = await loadFixture(
      deployFixture
    );

    await expect(
      MarketplaceContract.connect(Alice).listMarketItem(
        ArtworkContract.address,
        0,
        ethers.utils.parseEther("0"),
        { value: ethers.utils.parseEther("0.01") }
      )
    ).to.be.revertedWithCustomError(
      MarketplaceContract,
      "PriceIsntGreaterThanZero"
    );
  });

  it("Should allow the listing of an item", async () => {
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
  });

  it("Should not allow listing an item that is already on the marketplace", async () => {
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

    await expect(
      MarketplaceContract.listMarketItem(
        ArtworkContract.address,
        0,
        ethers.utils.parseEther("0.1"),
        { value: ethers.utils.parseEther("0.01") }
      )
    ).to.be.revertedWithCustomError(
      MarketplaceContract,
      "OnlyOwnerCanListItem"
    );
  });
});
