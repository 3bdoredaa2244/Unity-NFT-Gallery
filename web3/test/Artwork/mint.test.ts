import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import deployFixture from "./deployFixture";

describe("Artwork mint tests", () => {
  it("Should mint token and set uri accordingly", async () => {
    const { ArtworkContract } = await loadFixture(deployFixture);

    const testURI = "ipfs://testHash";

    await expect(await ArtworkContract.mint(testURI)).not.be.reverted;
  });
});
