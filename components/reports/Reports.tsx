
import ReportSummary from "./ReportSummary";
import SalesReport from "./SalesReport";
import StockReport from "./StockReport";

export default function Reports() {
  return (
    <div className="space-y-6 p-6 md:p-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="mt-1 text-sm text-gray-500">
          View sales performance and current inventory reports.
        </p>
      </div>

      <ReportSummary />
      <SalesReport />
      <StockReport />
    </div>
  );
}
