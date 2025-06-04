
import { useState, useEffect } from "react";

const cityOptions = [
  "基隆市", "台北市", "新北市", "桃園市", "新竹市", "新竹縣", "苗栗縣",
  "台中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣",
  "台南市", "高雄市", "屏東縣", "台東縣", "花蓮縣", "宜蘭縣",
  "澎湖縣", "金門縣", "連江縣"
];

export default function ArchaeologyForm() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    siteName: "",
    siteCode: "",
    date: new Date().toISOString().split("T")[0],
    locationCity: "",
    locationTown: "",
    pit: "",
    layer: "",
    length: "",
    width: "",
    orientation: "",
    depthFrom: "",
    depthTo: "",
    recorder: "",
    soilColor: "",
    soilTexture: "",
    artifacts: "",
    features: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("archaeoEntries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("archaeoEntries", JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([...entries, { ...form }]);
    setForm((f) => ({ ...f, artifacts: "", features: "" }));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">田野紀錄表單</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="siteName" placeholder="遺址名稱" value={form.siteName} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="siteCode" placeholder="遺址代號" value={form.siteCode} onChange={handleChange} className="p-2 border rounded" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-2 border rounded" />

        <select name="locationCity" value={form.locationCity} onChange={handleChange} className="p-2 border rounded">
          <option value="">選擇地點 - 市/縣</option>
          {cityOptions.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>

        <input type="text" name="locationTown" placeholder="地點 - 鄉鎮區" value={form.locationTown} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="pit" placeholder="坑號 (例如 T1P2)" value={form.pit} onChange={handleChange} className="p-2 border rounded" required />
        <input type="text" name="layer" placeholder="層位 (例如 L24)" value={form.layer} onChange={handleChange} className="p-2 border rounded" required />
        <input type="text" name="length" placeholder="發掘長度 (m)" value={form.length} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="width" placeholder="發掘寬度 (m)" value={form.width} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="orientation" placeholder="探坑方向" value={form.orientation} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="depthFrom" placeholder="深度起點 (cm)" value={form.depthFrom} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="depthTo" placeholder="深度終點 (cm)" value={form.depthTo} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="recorder" placeholder="紀錄人" value={form.recorder} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="soilColor" placeholder="土色 (如 10YR 5/3)" value={form.soilColor} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="soilTexture" placeholder="土質 (如 黏土、砂土)" value={form.soilTexture} onChange={handleChange} className="p-2 border rounded" />
        <textarea name="artifacts" placeholder="遺物紀錄" value={form.artifacts} onChange={handleChange} className="p-2 border rounded" />
        <textarea name="features" placeholder="遺跡、現象紀錄" value={form.features} onChange={handleChange} className="p-2 border rounded" />
        <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded">儲存紀錄</button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">📋 已儲存紀錄</h2>
        <ul className="space-y-2">
          {entries.map((entry, i) => (
            <li key={i} className="border p-2 rounded text-sm">
              <strong>{entry.date}</strong> | {entry.siteName} ({entry.siteCode}) | {entry.pit}-{entry.layer} | 深度: {entry.depthFrom}~{entry.depthTo} cm<br />
              地點: {entry.locationCity}{entry.locationTown ? ` ${entry.locationTown}` : ""}<br />
              土色: {entry.soilColor}，土質: {entry.soilTexture}，紀錄人: {entry.recorder}<br />
              遺物: {entry.artifacts}<br />
              遺跡: {entry.features}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
