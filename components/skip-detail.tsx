import { useGlobalUrlQueryParams } from "hooks"
import { SKIPS } from "mocks"
import { SkipService } from "services"
import { IconClock, IconMapPin, IconTruck, IconWeight, IconCalculator, IconArrowRight, IconX } from "@tabler/icons-react"

export function SkipDetail() {
  const {queryParams: {selectedSkipId}, setQueryParams} = useGlobalUrlQueryParams();
  
  const skip = SKIPS.find(skip => skip.id === selectedSkipId);
  
  if (!skip) {
    return <div>Skip not found</div>;
  }

  const totalPrice = SkipService.calculateTotalPrice(skip);
  const vatAmount = skip.priceBeforeVat * (skip.vat / 100);
  
  const handleCancel = () => {
    setQueryParams({ selectedSkipId: 0 });
  };

  const handleNext = () => {
    // TODO: Implement next step logic
    console.log('Next step');
  };

  return (
    <div className="h-full flex flex-col justify-between gap-6">
      <div className="space-y-4 w-full">
        <img 
          src={skip.imageUrl} 
          alt={`${skip.size} yard skip`} 
          className="w-full h-64 object-cover rounded-b-lg"
        />
        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-800">{skip.size} Yard Skip</h2>
            <div className="flex items-center gap-2 text-slate-600">
              <IconClock size={18} />
              <span>{skip.hirePeriodDays} days hire period</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <IconMapPin size={18} />
              <span>{skip.postcode} {skip.area}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Price</span>
              <span className="text-2xl font-semibold text-slate-800">£{skip.priceBeforeVat.toFixed(2)}</span>
            </div>
            
            <div className="h-px bg-slate-200" />

            <div className="space-y-3">
              <h3 className="font-medium text-slate-800">Features</h3>
              <ul className="space-y-2">
                {skip.allowedOnRoad && (
                  <li className="flex items-center gap-2 text-slate-600">
                    <IconTruck size={18} />
                    <span>Allowed on Road</span>
                  </li>
                )}
                {skip.allowsHeavyWaste && (
                  <li className="flex items-center gap-2 text-slate-600">
                    <IconWeight size={18} />
                    <span>Allows Heavy Waste</span>
                  </li>
                )}
                {skip.transportCost && (
                  <li className="flex items-center gap-2 text-slate-600">
                    <IconTruck size={18} />
                    <span>Transport Cost: £{skip.transportCost}</span>
                  </li>
                )}
                {skip.perTonneCost && (
                  <li className="flex items-center gap-2 text-slate-600">
                    <IconWeight size={18} />
                    <span>Per Tonne Cost: £{skip.perTonneCost}</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <IconCalculator size={18} className="text-slate-800" />
                <h3 className="font-medium text-slate-800">Price Breakdown</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Base Price</span>
                  <span>£{skip.priceBeforeVat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>VAT ({skip.vat}%)</span>
                  <span>£{vatAmount.toFixed(2)}</span>
                </div>
                {skip.transportCost && (
                  <div className="flex justify-between text-slate-600">
                    <span>Transport Cost</span>
                    <span>£{skip.transportCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="h-px bg-slate-200 my-2" />
                <div className="flex justify-between font-medium text-slate-800">
                  <span>Total Price</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sticky bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-slate-200">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <IconX size={18} />
            Cancel
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-800 rounded-full hover:bg-blue-900 transition-colors cursor-pointer"
          >
            Next Step
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
