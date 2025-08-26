export function AssetSelector({ selectedAssets, onChange }) {
  const assets = ["BTC", "ETH", "SOL", "DOGE", "ADA"];
  return (
    <div>
      <p className="font-semibold mb-2">
        Which crypto assets are you interested in?
      </p>
      {assets.map((asset) => (
        <label key={asset} className="block">
          <input
            type="checkbox"
            checked={selectedAssets.includes(asset)}
            onChange={() => onChange("assets", asset)}
          />
          <span className="ml-2">{asset}</span>
        </label>
      ))}
    </div>
  );
}

export function InvestorTypeSelector({ selected, onChange }) {
  const types = ["HODLer", "Day Trader", "NFT Collector"];
  return (
    <div>
      <p className="font-semibold mb-2">What type of investor are you?</p>
      {types.map((type) => (
        <label key={type} className="block">
          <input
            type="radio"
            name="investorType"
            value={type}
            checked={selected === type}
            onChange={() => onChange("investorType", type)}
          />
          <span className="ml-2">{type}</span>
        </label>
      ))}
    </div>
  );
}

export function ContentTypeSelector({ selectedContent, onChange }) {
  const types = ["Market News", "Charts", "AI Insight", "Fun"];
  return (
    <div>
      <p className="font-semibold mb-2">
        What kind of content would you like to see?
      </p>
      {types.map((type) => (
        <label key={type} className="block">
          <input
            type="checkbox"
            checked={selectedContent.includes(type)}
            onChange={() => onChange("contentTypes", type)}
          />
          <span className="ml-2">{type}</span>
        </label>
      ))}
    </div>
  );
}
