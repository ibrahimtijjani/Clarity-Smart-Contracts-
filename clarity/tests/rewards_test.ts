
import { Clarinet, Tx, Chain, Account, assertEquals } from '@stacks/transactions';
import { contracts } from './clarity-test-utils/contracts';

Clarinet.test({
  name: 'rewards: ensure that <insert test here>',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get('deployer')!;
    chain.mineBlock([
      /*
          Transaction.contractCall("<contract-name>", "<function-name>", [
              Clarity.uint("<argument>")
          ], deployer.address),
       */
    ]);
    let result = chain.callReadOnlyFn('rewards', 'get-total-rewards', [], deployer.address);
    assertEquals(result.result, '(var 0)');
  },
});
