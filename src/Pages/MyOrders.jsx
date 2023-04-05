import accounting from "accounting";

export default function MyOrders() {
  return (
    <>
      <div class="table-container">
        <header>
          <h2>Мои заказы</h2>
        </header>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Клиент</th>
              <th>Остаток</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>123456</td>
              <td>Виалетта</td>
              <td>{accounting.formatNumber(1000000, 0, " ")} сум</td>
              <td>В таблице</td>
            </tr>
            <tr>
              <td>654321</td>
              <td>Амелиа</td>
              <td>{accounting.formatNumber(4300000, 0, " ")} сум</td>
              <td>Ожидание...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
