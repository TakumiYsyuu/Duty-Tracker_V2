import React, { useRef, useState, useEffect } from "react";

const DashBoard = () => {
  const logModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [duties, setDuties] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const emptyForm = {
    dutyIn: "",
    dutyOut: "",
    overtime: "",
    hourlyRate: "",
    dayRate: "",
    otRate: "",
    payType: "hourly",
  };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const saved = localStorage.getItem("duties");
    if (saved) setDuties(JSON.parse(saved));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const calculateHours = (dutyIn, dutyOut) => {
    if (!dutyIn || !dutyOut) return 0;
    const diff = new Date(dutyOut) - new Date(dutyIn);
    const hours = diff / (1000 * 60 * 60);
    return hours > 0 ? hours : 0;
  };

  const computeEntry = (f) => {
    const hoursWorked = calculateHours(f.dutyIn, f.dutyOut);
    const overtimeHours = Number(f.overtime) || 0;
    const otRate = Number(f.otRate) || 0;
    const otEarnings = overtimeHours * otRate;
    const regularHours = Math.max(hoursWorked - overtimeHours, 0);
    let baseEarnings = 0;
    if (f.payType === "hourly")
      baseEarnings = regularHours * (Number(f.hourlyRate) || 0);
    else if (f.payType === "daily") baseEarnings = Number(f.dayRate) || 0;
    else if (f.payType === "fixed")
      baseEarnings = Number(f.dayRate || f.hourlyRate) || 0;
    return {
      dutyIn: f.dutyIn,
      dutyOut: f.dutyOut,
      overtime: overtimeHours,
      hourlyRate: Number(f.hourlyRate) || 0,
      dayRate: Number(f.dayRate) || 0,
      otRate,
      payType: f.payType,
      hoursWorked: Number((hoursWorked + overtimeHours).toFixed(2)),
      regularHours: Number(regularHours.toFixed(2)),
      baseEarnings: Number(baseEarnings.toFixed(2)),
      otEarnings: Number(otEarnings.toFixed(2)),
      earnings: Number((baseEarnings + otEarnings).toFixed(2)),
    };
  };

  const saveDuty = () => {
    const entry = computeEntry(form);
    let updated;
    if (editingIndex !== null) {
      updated = duties.map((d, i) => (i === editingIndex ? entry : d));
      setEditingIndex(null);
    } else {
      updated = [...duties, entry];
    }
    setDuties(updated);
    localStorage.setItem("duties", JSON.stringify(updated));
    setOpen(false);
    logModalRef.current?.close();
    setForm(emptyForm);
  };

  const startEdit = (i) => {
    const d = duties[i];
    setForm({
      dutyIn: d.dutyIn || "",
      dutyOut: d.dutyOut || "",
      overtime: d.overtime?.toString() || "",
      hourlyRate: d.hourlyRate?.toString() || "",
      dayRate: d.dayRate?.toString() || "",
      otRate: d.otRate?.toString() || "",
      payType: d.payType || "hourly",
    });
    setEditingIndex(i);
    setOpen(true);
    setExpandedIndex(null);
    logModalRef.current?.showModal();
  };

  const confirmDelete = (i) => {
    setDeleteConfirm(i);
    deleteModalRef.current?.showModal();
  };

  const deleteDuty = () => {
    const updated = duties.filter((_, idx) => idx !== deleteConfirm);
    setDuties(updated);
    localStorage.setItem("duties", JSON.stringify(updated));
    if (expandedIndex === deleteConfirm) setExpandedIndex(null);
    setDeleteConfirm(null);
    deleteModalRef.current?.close();
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
    deleteModalRef.current?.close();
  };

  const cancelForm = () => {
    setOpen(false);
    setEditingIndex(null);
    setForm(emptyForm);
    logModalRef.current?.close();
  };

  const preview = computeEntry(form);

  const totalHours = duties
    .reduce((s, d) => s + Number(d.hoursWorked || 0), 0)
    .toFixed(2);
  const totalPay = duties
    .reduce((s, d) => s + Number(d.earnings || 0), 0)
    .toFixed(2);
  const totalOT = duties
    .reduce((s, d) => s + Number(d.otEarnings || 0), 0)
    .toFixed(2);

  const formatDate = (dt) => {
    if (!dt) return "—";
    return new Date(dt).toLocaleDateString("en-PH", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dt) => {
    if (!dt) return "—";
    return new Date(dt).toLocaleTimeString("en-PH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDT = (dt) => {
    if (!dt) return "—";
    return new Date(dt).toLocaleString("en-PH", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-[auto_1fr_1fr_auto] gap-3">
          <div className="md:col-span-5 md:col-start-1 md:row-start-1 bg-[#1b263b] rounded-xl p-5 flex items-center justify-between border border-[#415a77]">
            <div className="flex flex-col gap-1">
              <span className="font-brand text-2xl font-semibold text-[#e0e1dd] tracking-widest uppercase">
                Kinsenas Tracker
              </span>
              <span className="font-body text-xs tracking-widest text-[#778da9] uppercase">
                Financial Tracker · by Victor
              </span>
              <span className="font-ui text-xs text-[#778da9] font-light tracking-wide">
                Duty Tracker
              </span>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-1 md:row-start-2 md:row-span-2 bg-[#1b263b] rounded-xl p-5 border border-[#415a77]">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0d1b2a] rounded-lg p-3 border border-[#415a77]">
                <p className="font-ui text-xs uppercase tracking-widest text-[#778da9] mb-2">
                  Duty Log
                </p>
                <p className="font-brand text-xl font-semibold text-[#e0e1dd]">
                  {duties.length}
                </p>
              </div>
              <div className="bg-[#0d1b2a] rounded-lg p-3 border border-[#415a77]">
                <p className="font-ui text-xs uppercase tracking-widest text-[#778da9] mb-2">
                  Total Hours
                </p>
                <p className="font-brand text-xl font-semibold text-[#e0e1dd]">
                  {totalHours} hrs
                </p>
              </div>
              <div className="bg-[#0d1b2a] rounded-lg p-3 border border-[#415a77]">
                <p className="font-ui text-xs uppercase tracking-widest text-[#778da9] mb-2">
                  OT Pay
                </p>
                <p className="font-brand text-xl font-semibold text-emerald-400">
                  ₱{totalOT}
                </p>
              </div>
              <div className="bg-[#0d1b2a] rounded-lg p-3 border border-[#415a77]">
                <p className="font-ui text-xs uppercase tracking-widest text-[#778da9] mb-2">
                  Total Pay
                </p>
                <p className="font-brand text-xl font-semibold text-emerald-400">
                  ₱{totalPay}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-1 md:row-start-4 bg-[#415a77] hover:bg-[#4e6d8c] rounded-xl border border-[#415a77] flex items-center justify-center cursor-pointer transition-colors duration-200">
            <button
              onClick={() => {
                setForm(emptyForm);
                setEditingIndex(null);
                logModalRef.current?.showModal();
              }}
              className="font-ui w-full h-full py-5 text-[#e0e1dd] font-medium text-sm tracking-widest uppercase flex items-center justify-center gap-2"
            >
              + Log New Duty
            </button>
          </div>

          <div className="md:col-span-3 md:col-start-3 md:row-start-2 md:row-span-3 bg-[#1b263b] rounded-xl p-5 border border-[#415a77] flex flex-col gap-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="font-brand text-sm font-semibold text-[#e0e1dd] tracking-widest uppercase">
                Duty Log
              </span>
              <span className="font-ui text-xs bg-[#415a77] text-[#e0e1dd] px-3 py-1 rounded-full tracking-wide">
                {duties.length} {duties.length === 1 ? "entry" : "entries"}
              </span>
            </div>

            {duties.length === 0 ?
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <p className="font-ui text-xs uppercase tracking-widest text-[#415a77]">
                  No duties logged yet
                </p>
                <p className="font-body text-xs text-[#415a77]">
                  Tap + Log New Duty to get started
                </p>
              </div>
            : duties.map((d, i) => (
                <div
                  key={i}
                  className="bg-[#0d1b2a] rounded-xl border border-[#415a77] p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                      <span className="font-ui text-xs font-medium text-[#778da9] uppercase tracking-widest">
                        {d.payType} · #{i + 1}
                      </span>
                    </div>
                    <span className="font-brand text-sm font-semibold text-emerald-400">
                      ₱{d.earnings}
                    </span>
                  </div>

                  <p className="font-body text-xs text-[#778da9]">
                    {formatDate(d.dutyIn)}
                  </p>

                  <p className="font-body text-sm font-semibold text-[#e0e1dd]">
                    {formatTime(d.dutyIn)} → {formatTime(d.dutyOut)}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-ui text-xs bg-[#1b263b] border border-[#415a77] text-[#778da9] px-2.5 py-1 rounded-full">
                      {d.hoursWorked} hrs
                    </span>
                    <span className="font-ui text-xs bg-[#1b263b] border border-[#415a77] text-[#778da9] px-2.5 py-1 rounded-full">
                      {d.regularHours} reg
                    </span>
                    <span className="font-ui text-xs bg-[#1b263b] border border-[#415a77] text-[#778da9] px-2.5 py-1 rounded-full">
                      {d.overtime} OT
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-[#415a77]">
                    <button
                      onClick={() => startEdit(i)}
                      className="font-ui text-xs text-[#778da9] hover:text-[#e0e1dd] uppercase tracking-widest transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(i)}
                      className="font-ui text-xs text-red-400 hover:text-red-300 uppercase tracking-widest ml-auto transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <dialog ref={logModalRef} className="modal modal-middle">
        <div className="modal-box bg-[#1b263b] border border-[#415a77] rounded-xl p-0 w-11/12 max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-[#415a77] bg-[#1b263b]">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-brand text-base font-semibold text-[#e0e1dd] tracking-widest uppercase">
                {editingIndex !== null ? "Edit Duty" : "Log New Duty"}
              </h3>
              <p className="font-body text-xs text-[#778da9]">
                Fill in your duty details below
              </p>
            </div>
            <button
              onClick={cancelForm}
              className="p-2 rounded-lg text-[#778da9] hover:bg-[#415a77] hover:text-[#e0e1dd] transition-colors duration-200"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-5 px-6 py-5">
            <div className="flex flex-col gap-2">
              <label className="font-ui text-xs uppercase tracking-widest text-[#778da9]">
                Pay Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["hourly", "daily", "fixed"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setForm({ ...form, payType: type })}
                    className={`font-ui py-2.5 rounded-lg text-xs font-semibold uppercase tracking-widest border transition-colors duration-200 ${
                      form.payType === type ?
                        "bg-[#415a77] border-[#778da9] text-[#e0e1dd]"
                      : "bg-[#0d1b2a] border-[#415a77] text-[#778da9] hover:bg-[#415a77] hover:text-[#e0e1dd]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label className="font-ui text-xs uppercase tracking-widest text-[#778da9]">
                  Duty In
                </label>
                <input
                  type="datetime-local"
                  name="dutyIn"
                  value={form.dutyIn}
                  onChange={handleChange}
                  style={{
                    colorScheme: "dark",
                    backgroundColor: "#0d1b2a",
                    color: form.dutyIn ? "#e0e1dd" : "#778da9",
                    borderColor: "#415a77",
                  }}
                  className="font-body text-xs rounded-lg px-3 py-2.5 w-full border focus:outline-none focus:border-[#778da9] transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-ui text-xs uppercase tracking-widest text-[#778da9]">
                  Duty Out
                </label>
                <input
                  type="datetime-local"
                  name="dutyOut"
                  value={form.dutyOut}
                  onChange={handleChange}
                  style={{
                    colorScheme: "dark",
                    backgroundColor: "#0d1b2a",
                    color: form.dutyOut ? "#e0e1dd" : "#778da9",
                    borderColor: "#415a77",
                  }}
                  className="font-body text-xs rounded-lg px-3 py-2.5 w-full border focus:outline-none focus:border-[#778da9] transition-colors duration-200"
                />
              </div>
            </div>

            {form.payType === "hourly" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="font-ui text-xs uppercase tracking-widest text-[#778da9]">
                      Hourly Rate (₱)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      name="hourlyRate"
                      value={form.hourlyRate}
                      onChange={handleChange}
                      style={{
                        backgroundColor: "#0d1b2a",
                        borderColor: "#415a77",
                      }}
                      className="font-body text-[#e0e1dd] placeholder-[#415a77] text-sm rounded-lg px-3 py-2.5 w-full border focus:outline-none focus:border-[#778da9] transition-colors duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-ui text-xs uppercase tracking-widest text-[#778da9]">
                      OT Rate/Hr (₱)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      name="otRate"
                      value={form.otRate}
                      onChange={handleChange}
                      style={{
                        backgroundColor: "#0d1b2a",
                        borderColor: "#415a77",
                      }}
                      className="font-body text-[#e0e1dd] placeholder-[#415a77] text-sm rounded-lg px-3 py-2.5 w-full border focus:outline-none focus:border-[#778da9] transition-colors duration-200"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-ui text-xs uppercase tracking-widest text-[#778da9]">
                    Overtime Hours
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    name="overtime"
                    value={form.overtime}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#0d1b2a",
                      borderColor: "#415a77",
                    }}
                    className="font-body text-[#e0e1dd] placeholder-[#415a77] text-sm rounded-lg px-3 py-2.5 w-full border focus:outline-none focus:border-[#778da9] transition-colors duration-200"
                  />
                </div>
              </>
            )}

            {form.payType === "daily" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="font-ui text-xs uppercase tracking-widest text-[#778da9]">
                      Day Rate (₱)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      name="dayRate"
                      value={form.dayRate}
                      onChange={handleChange}
                      style={{
                        backgroundColor: "#0d1b2a",
                        borderColor: "#415a77",
                      }}
                      className="font-body text-[#e0e1dd] placeholder-[#415a77] text-sm rounded-lg px-3 py-2.5 w-full border focus:outline-none focus:border-[#778da9] transition-colors duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-ui text-xs uppercase tracking-widest text-[#778da9]">
                      OT Rate/Hr (₱)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      name="otRate"
                      value={form.otRate}
                      onChange={handleChange}
                      style={{
                        backgroundColor: "#0d1b2a",
                        borderColor: "#415a77",
                      }}
                      className="font-body text-[#e0e1dd] placeholder-[#415a77] text-sm rounded-lg px-3 py-2.5 w-full border focus:outline-none focus:border-[#778da9] transition-colors duration-200"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-ui text-xs uppercase tracking-widest text-[#778da9]">
                    Overtime Hours
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    name="overtime"
                    value={form.overtime}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#0d1b2a",
                      borderColor: "#415a77",
                    }}
                    className="font-body text-[#e0e1dd] placeholder-[#415a77] text-sm rounded-lg px-3 py-2.5 w-full border focus:outline-none focus:border-[#778da9] transition-colors duration-200"
                  />
                </div>
              </>
            )}

            {form.payType === "fixed" && (
              <div className="flex flex-col gap-2">
                <label className="font-ui text-xs uppercase tracking-widest text-[#778da9]">
                  Fixed Pay (₱)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  name="dayRate"
                  value={form.dayRate}
                  onChange={handleChange}
                  style={{ backgroundColor: "#0d1b2a", borderColor: "#415a77" }}
                  className="font-body text-[#e0e1dd] placeholder-[#415a77] text-sm rounded-lg px-3 py-2.5 w-full border focus:outline-none focus:border-[#778da9] transition-colors duration-200"
                />
              </div>
            )}

            <div
              style={{ backgroundColor: "#0d1b2a", borderColor: "#415a77" }}
              className="border rounded-xl p-4 flex flex-col gap-2"
            >
              <p className="font-ui text-xs uppercase tracking-widest text-[#415a77] mb-1">
                Live Preview
              </p>
              <div className="flex justify-between font-body text-sm text-[#e0e1dd]">
                <span>Total clocked</span>
                <span>{preview.hoursWorked} hrs</span>
              </div>
              {form.payType !== "fixed" && (
                <>
                  <div className="flex justify-between font-body text-xs text-[#778da9]">
                    <span>Regular hrs</span>
                    <span>{preview.regularHours} hrs</span>
                  </div>
                  <div className="flex justify-between font-body text-xs text-[#778da9]">
                    <span>OT hrs</span>
                    <span>{preview.overtime} hrs</span>
                  </div>
                </>
              )}
              <div className="border-t border-[#415a77] my-1" />
              {form.payType === "hourly" && (
                <>
                  <div className="flex justify-between font-body text-xs text-[#778da9]">
                    <span>Base pay</span>
                    <span>₱{preview.baseEarnings}</span>
                  </div>
                  <div className="flex justify-between font-body text-xs text-[#778da9]">
                    <span>
                      OT ({preview.overtime}h × ₱{Number(form.otRate) || 0})
                    </span>
                    <span>₱{preview.otEarnings}</span>
                  </div>
                </>
              )}
              {form.payType === "daily" && (
                <>
                  <div className="flex justify-between font-body text-xs text-[#778da9]">
                    <span>Day rate</span>
                    <span>₱{preview.baseEarnings}</span>
                  </div>
                  <div className="flex justify-between font-body text-xs text-[#778da9]">
                    <span>
                      OT ({preview.overtime}h × ₱{Number(form.otRate) || 0})
                    </span>
                    <span>₱{preview.otEarnings}</span>
                  </div>
                </>
              )}
              {form.payType === "fixed" && (
                <div className="flex justify-between font-body text-xs text-[#778da9]">
                  <span>Fixed pay</span>
                  <span>₱{preview.baseEarnings}</span>
                </div>
              )}
              <div className="border-t border-[#415a77] my-1" />
              <div className="flex justify-between font-body text-sm font-semibold text-[#e0e1dd]">
                <span>Total</span>
                <span className="text-emerald-400">₱{preview.earnings}</span>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 px-6 py-4 border-t border-[#415a77] bg-[#1b263b]">
            <button
              onClick={saveDuty}
              className="font-ui w-full py-3 rounded-xl bg-[#415a77] hover:bg-[#778da9] hover:text-[#0d1b2a] text-[#e0e1dd] text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
            >
              {editingIndex !== null ? "Update Duty" : "Save Duty"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={cancelForm}>close</button>
        </form>
      </dialog>

      <dialog ref={deleteModalRef} className="modal modal-middle">
        <div className="modal-box bg-[#1b263b] border border-[#415a77] rounded-xl p-0 w-11/12 max-w-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#415a77]">
            <h3 className="font-brand text-base font-semibold text-[#e0e1dd] tracking-widest uppercase">
              Delete Duty
            </h3>
            <button
              onClick={cancelDelete}
              className="p-2 rounded-lg text-[#778da9] hover:bg-[#415a77] hover:text-[#e0e1dd] transition-colors duration-200"
            >
              ✕
            </button>
          </div>

          <div className="px-6 py-6 flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-red-900/20 border border-red-500/30 flex items-center justify-center">
              <span className="text-red-400 text-xl">!</span>
            </div>
            <p className="font-body text-sm text-[#e0e1dd]">
              Are you sure you want to delete
            </p>
            {deleteConfirm !== null && duties[deleteConfirm] && (
              <p className="font-brand text-xs uppercase tracking-widest text-[#778da9]">
                {duties[deleteConfirm].payType} · #{deleteConfirm + 1} —{" "}
                <span className="text-emerald-400">
                  ₱{duties[deleteConfirm].earnings}
                </span>
              </p>
            )}
            <p className="font-body text-xs text-[#415a77]">
              This action cannot be undone.
            </p>
          </div>

          <div className="px-6 py-4 border-t border-[#415a77] grid grid-cols-2 gap-3">
            <button
              onClick={cancelDelete}
              className="font-ui py-3 rounded-xl bg-[#0d1b2a] border border-[#415a77] hover:bg-[#415a77] text-[#778da9] hover:text-[#e0e1dd] text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={deleteDuty}
              className="font-ui py-3 rounded-xl bg-red-900/30 border border-red-500/40 hover:bg-red-900/50 text-red-400 hover:text-red-300 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={cancelDelete}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default DashBoard;
