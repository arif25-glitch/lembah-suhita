import { client } from '@/app/config/database_config';


interface Itemsets {
  [key: string]: number;
}

function apriori(transactions: string[][], minSupport: number): string[][] {
  const itemsets: Itemsets = {};
  const frequentItemsets: string[][] = [];

  // Count item frequencies
  transactions.forEach(transaction => {
    transaction.forEach(item => {
      if (!itemsets[item]) {
        itemsets[item] = 0;
      }
      itemsets[item]++;
    });
  });

  // Filter itemsets by minSupport
  for (const item in itemsets) {
    if (itemsets[item] >= minSupport) {
      frequentItemsets.push([item]);
    }
  }

  return frequentItemsets;
}

export async function GET() {
  try {
    await client.connect();
    const database = client.db('toko_arabic_parfume');
    const collection = database.collection('transactions');
    const produkCollection = database.collection('produk');
    
    const transactions = (await collection.find({}).toArray()).map(doc => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: doc.items.map((item: any) => ({
        data: {
          name: item.data.name
        }
      }))
    })) as Transaction[];

    const produk = await produkCollection.find({}).toArray();

    interface TransactionItem {
      data: {
        name: string;
      };
    }

    interface Transaction {
      items: TransactionItem[];
    }

    const data: string[][] = transactions.map((item: Transaction) => item.items.map((i: TransactionItem) => i.data.name));

    const minSupport = 2; // Example minimum support
    const frequentItemsets = apriori(data, minSupport);

    const filterFrequentItemsets = frequentItemsets.map((item) => item[0]);
    
    const result = produk.filter((item) => filterFrequentItemsets.includes(item.name));
    
    const uniqueItemsMap = new Map();
    filterFrequentItemsets.forEach(name => {
      const item = result.find(item => item.name === name);
      if (item && !uniqueItemsMap.has(item.name)) {
        uniqueItemsMap.set(item.name, {
          id: item._id,
          name: item.name,
          image: item.imageUrl,
          // Add other properties if needed
        });
      }
    });

    const setItems = Array.from(uniqueItemsMap.values());

    return new Response(JSON.stringify({ status: true, data: setItems }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ status: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}