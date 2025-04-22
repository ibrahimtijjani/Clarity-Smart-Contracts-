"use client";

import { useState, useEffect } from "react";
import { getTokenBalances, depositTokens, withdrawTokens, getRewards, TokenBalance, Rewards } from "@/services/stacks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";

const WalletAddressInput = () => {
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="wallet-address">Wallet Address:</Label>
      <Input
        id="wallet-address"
        type="text"
        placeholder="Enter your Stacks wallet address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
    </div>
  );
};

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [rewards, setRewards] = useState<Rewards[]>([]);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositToken, setDepositToken] = useState("STX");
  const [depositPool, setDepositPool] = useState("Pool A");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawToken, setWithdrawToken] = useState("STX");
  const [withdrawPool, setWithdrawPool] = useState("Pool A");
  const { toast } = useToast();

  useEffect(() => {
    if (walletAddress) {
      fetchData();
    }
  }, [walletAddress]);

  const fetchData = async () => {
    const balances = await getTokenBalances(walletAddress);
    setTokenBalances(balances);

    const rewardsData = await getRewards(walletAddress);
    setRewards(rewardsData);
  };

  const handleDeposit = async () => {
    if (!walletAddress || !depositToken || !depositAmount || !depositPool) {
      toast({
        title: "Error",
        description: "Please fill in all deposit fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const txId = await depositTokens(
        walletAddress,
        depositToken,
        parseFloat(depositAmount),
        depositPool
      );
      toast({
        title: "Deposit Successful",
        description: `Transaction ID: ${txId}`,
      });
      fetchData(); // Refresh data after deposit
    } catch (error: any) {
      toast({
        title: "Deposit Failed",
        description: error.message || "An error occurred during deposit.",
        variant: "destructive",
      });
    }
  };

  const handleWithdraw = async () => {
    if (!walletAddress || !withdrawToken || !withdrawAmount || !withdrawPool) {
      toast({
        title: "Error",
        description: "Please fill in all withdraw fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const txId = await withdrawTokens(
        walletAddress,
        withdrawToken,
        parseFloat(withdrawAmount),
        withdrawPool
      );
      toast({
        title: "Withdrawal Successful",
        description: `Transaction ID: ${txId}`,
      });
      fetchData(); // Refresh data after withdrawal
    } catch (error: any) {
      toast({
        title: "Withdrawal Failed",
        description: error.message || "An error occurred during withdrawal.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Stacks Liquid</h1>

      <div className="w-full max-w-md mb-4">
        <Label htmlFor="wallet-address">Wallet Address:</Label>
        <Input
          id="wallet-address"
          type="text"
          placeholder="Enter your Stacks wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
      </div>

      <Card className="w-full max-w-md mb-4">
        <CardHeader>
          <CardTitle>Token Balances</CardTitle>
          <CardDescription>Your STX and SIP-010 token balances.</CardDescription>
        </CardHeader>
        <CardContent>
          {tokenBalances.length > 0 ? (
            <div className="grid gap-2">
              {tokenBalances.map((balance) => (
                <div key={balance.token} className="flex items-center space-x-2">
                  <Icons.circle className="w-4 h-4" />
                  <span>{balance.token}:</span>
                  <span>{balance.balance}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No token balances to display.</p>
          )}
        </CardContent>
      </Card>

      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Deposit Tokens</CardTitle>
            <CardDescription>Deposit STX or SIP-010 tokens into liquidity pools.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="deposit-token">Token</Label>
              <Select value={depositToken} onValueChange={setDepositToken}>
                <SelectTrigger id="deposit-token">
                  <SelectValue placeholder="Select Token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STX">STX</SelectItem>
                  <SelectItem value="USDA">USDA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deposit-amount">Amount</Label>
              <Input
                id="deposit-amount"
                type="number"
                placeholder="Enter amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="deposit-pool">Pool</Label>
              <Select value={depositPool} onValueChange={setDepositPool}>
                <SelectTrigger id="deposit-pool">
                  <SelectValue placeholder="Select Pool" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pool A">Pool A</SelectItem>
                  <SelectItem value="Pool B">Pool B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDeposit}>Deposit</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Withdraw Tokens</CardTitle>
            <CardDescription>Withdraw STX or SIP-010 tokens from liquidity pools.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="withdraw-token">Token</Label>
              <Select value={withdrawToken} onValueChange={setWithdrawToken}>
                <SelectTrigger id="withdraw-token">
                  <SelectValue placeholder="Select Token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STX">STX</SelectItem>
                  <SelectItem value="USDA">USDA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="withdraw-amount">Amount</Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="withdraw-pool">Pool</Label>
              <Select value={withdrawPool} onValueChange={setWithdrawPool}>
                <SelectTrigger id="withdraw-pool">
                  <SelectValue placeholder="Select Pool" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pool A">Pool A</SelectItem>
                  <SelectItem value="Pool B">Pool B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleWithdraw}>Withdraw</Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="w-full max-w-md mb-4">
        <CardHeader>
          <CardTitle>Rewards</CardTitle>
          <CardDescription>Rewards earned for providing liquidity.</CardDescription>
        </CardHeader>
        <CardContent>
          {rewards.length > 0 ? (
            <div className="grid gap-2">
              {rewards.map((reward) => (
                <div key={reward.pool} className="flex items-center space-x-2">
                  <Icons.circle className="w-4 h-4 text-green-500" />
                  <span>{reward.pool}:</span>
                  <span>{reward.amount} {reward.token}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No rewards to display.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
