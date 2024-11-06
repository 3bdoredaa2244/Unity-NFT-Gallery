import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import deployFixture from "./deployFixture";

describe("Artwork contractURI tests", () => {
  it("Should return the contractURI", async () => {
    const { ArtworkContract } = await loadFixture(deployFixture);

    await expect(await ArtworkContract.contractURI()).to.eq(
      "ipfs://Qmdyia2tdmKGVT3WEK4TCjBcRpnNLrgJqP4BGyew8W1LWa"
    );
  });
});
