import { StockService } from "@/service/stockService";



const stockService = new StockService();

export async function GET() {
  return new Response(JSON.stringify(stockService.getAll()), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request) {
  const newStock = await request.json();
  const created = stockService.add(newStock);

  return new Response(JSON.stringify(created), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(request: Request) {
  const updatedStock = await request.json();
  const result = stockService.update(updatedStock);

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '');

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });
  }

  stockService.delete(id);
  return new Response(null, { status: 204 });
}
