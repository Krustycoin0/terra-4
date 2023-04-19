import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { useQuery } from "react-query"
import { RecoilRoot } from "recoil"
import Governance from "pages/gov/Governance"
import { mockNetworks } from "./__mocks__/Networks.mock"
import { mockProposals } from "./__mocks__/Proposals.mock"
import { mockBankBalance } from "./__mocks__/BankBalance.mock"
import { mockWhitelist } from "./__mocks__/Whitelist.mock"

function renderComponent() {
  return render(
    <MemoryRouter>
      <RecoilRoot>
        <Governance />
      </RecoilRoot>
    </MemoryRouter>
  )
}

jest.mock("../../data/wallet", () => {
  const mockUseNetwork = () => {
    return mockNetworks
  }

  const mockUseNetworkName = () => {
    return "testnet"
  }

  return {
    useNetwork: mockUseNetwork,
    useNetworkName: mockUseNetworkName,
  }
})

jest.mock("react-query", () => ({
  useQuery: jest.fn().mockReturnValue({
    data: Object,
    isLoading: Boolean,
    error: Object,
  }),
}))

jest.mock("../../data/queries/bank", () => {
  const mockUseBankBalance = () => {
    return mockBankBalance
  }

  return {
    useBankBalance: mockUseBankBalance,
  }
})

jest.mock("../../data/queries/chains", () => {
  const actual = jest.requireActual("../../data/queries/chains")

  const mockUseWhitelist = () => {
    return mockWhitelist
  }

  return {
    ...actual,
    useWhitelist: mockUseWhitelist,
  }
})

describe("Governance", () => {
  it("matches original component", () => {
    useQuery.mockReturnValue({
      data: mockProposals,
      isLoading: false,
      error: {},
    })
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})