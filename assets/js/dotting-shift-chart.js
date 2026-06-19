// ABOUTME: Renders the Dottıng benchmark shift chart as an interactive SVG.
// ABOUTME: Loads compact static JSON so the chart works on GitHub Pages.
(function () {
  if (window.DottingShiftChart) {
    window.DottingShiftChart.initAll();
    return;
  }

  const CHART = {
    colors: {
      ink: "#17212b",
      muted: "#465d65",
      grid: "#d9e8e8",
      gpt: "#d33a3f",
      google: "#2f8a5b",
      flux: "#2a7287",
      other: "#8f8a81",
      band: "rgba(181, 137, 10, 0.09)",
      bracket: "#a4510a",
      trust: "#df5a5f",
      paper: "#fffffb",
    },
  };

  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const fmtPct = (value) => {
    if (value == null || Number.isNaN(Number(value))) return "n/a";
    return `${Math.round(Number(value) * 100)}%`;
  };

  const fmtCost = (value) => {
    if (value == null || Number.isNaN(Number(value))) return "n/a";
    return Number(value) < 0.01 ? `$${Number(value).toFixed(4)}` : `$${Number(value).toFixed(3)}`;
  };

  const fmtMs = (value) => {
    if (value == null || Number.isNaN(Number(value))) return "n/a";
    if (Number(value) > 1000) return `${(Number(value) / 1000).toFixed(1)}s`;
    return `${Math.round(Number(value))}ms`;
  };

  const chartSettings = (root) => {
    const isNarrow = root.getBoundingClientRect().width < 520;
    return {
      isNarrow,
      width: isNarrow ? 640 : 920,
      height: isNarrow ? 360 : 390,
      padding: isNarrow ? 54 : 58,
      xDomain: isNarrow ? [2025, 2026.7] : [2022.65, 2026.7],
      xTicks: isNarrow ? [2025, 2026] : [2023, 2024, 2025, 2026],
      labels: isNarrow
        ? [
            { modelKey: "gptimage1", text: "GPT Image 1", dx: 22, dy: -34, anchor: "start" },
            { modelKey: "flux2", text: "FLUX.2 [dev]", dx: -24, dy: 42, anchor: "end" },
            { modelKey: "gptimage15", text: "GPT Image 1.5", dx: -32, dy: -52, anchor: "end" },
            { modelKey: "nanobanana2", text: "Nano Banana 2", dx: 20, dy: -42, anchor: "start" },
            { modelKey: "gptimage2", text: "GPT Image 2", dx: 28, dy: -8, anchor: "start" },
          ]
        : [
            { modelKey: "gptimage1", text: "GPT Image 1", dx: -96, dy: -30, anchor: "end" },
            { modelKey: "flux2pro", text: "FLUX.2 Pro", dx: -118, dy: 42, anchor: "end" },
            { modelKey: "gptimage15", text: "GPT Image 1.5", dx: -54, dy: -56, anchor: "end" },
            { modelKey: "nanobanana2", text: "Nano Banana 2", dx: 22, dy: -62, anchor: "start" },
            { modelKey: "gptimage2", text: "GPT Image 2", dx: 46, dy: -12, anchor: "start" },
          ],
    };
  };

  const chartScales = (settings) => {
    const [minX, maxX] = settings.xDomain;
    const minY = 0;
    const maxY = 1;
    const width = settings.width;
    const height = settings.height;
    const padding = settings.padding;

    return {
      x: (value) => padding + ((Number(value) - minX) / (maxX - minX)) * (width - padding * 2),
      y: (value) => height - padding - ((Number(value) - minY) / (maxY - minY)) * (height - padding * 2),
    };
  };

  const bestSoFar = (rows) => {
    let best = -Infinity;
    return rows
      .filter((row) => Number.isFinite(row.releaseYear) && Number.isFinite(row.humanCorrectRate))
      .sort((a, b) => a.releaseYear - b.releaseYear)
      .filter((row) => {
        if (row.humanCorrectRate <= best) return false;
        best = row.humanCorrectRate;
        return true;
      });
  };

  const familyColor = (row) => {
    if (row.family === "gpt-image") return CHART.colors.gpt;
    if (row.family === "nano-banana" || row.organizationSlug === "google-deepmind") return CHART.colors.google;
    if (row.family === "flux") return CHART.colors.flux;
    return CHART.colors.other;
  };

  const formatTooltip = (row) =>
    [
      row.label,
      row.organization || row.family || "Unknown creator",
      `Release: ${row.releaseYearMonth || row.releaseDate || "unknown"}`,
      `Human exact: ${fmtPct(row.humanCorrectRate)} (${row.humanGraded || 0} labels)`,
      `Gemini 3.5 Flash review: ${fmtPct(row.geminiCorrectRate)} (${row.geminiGraded || 0} labels)`,
      `Claude Sonnet 4.6 review: ${fmtPct(row.claudeSonnetCorrectRate)} (${row.claudeSonnetGraded || 0} labels)`,
      `Human dotted rate: ${fmtPct(row.humanDottingRate)}`,
      `Cost / image: ${fmtCost(row.costPerImage)}`,
      `Median time: ${fmtMs(row.medianElapsedMs)}`,
    ].join("\n");

  const attachTooltip = (root) => {
    const tooltip = root.querySelector(".dotting-shift-tooltip");
    if (!tooltip) return;
    document.body.appendChild(tooltip);
    let activePoint = null;

    const position = (event, point) => {
      const rect = point.getBoundingClientRect();
      const x = event?.clientX ?? rect.left + rect.width / 2;
      const y = event?.clientY ?? rect.top + rect.height / 2;
      const margin = 12;
      const gap = 14;
      const tooltipWidth = tooltip.offsetWidth || 272;
      const tooltipHeight = tooltip.offsetHeight || 150;
      const preferredLeft = x + gap;
      const flippedLeft = x - tooltipWidth - gap;
      const left = preferredLeft + tooltipWidth + margin > window.innerWidth ? flippedLeft : preferredLeft;
      const top = y - tooltipHeight / 2;

      tooltip.style.left = `${clamp(left, margin, window.innerWidth - tooltipWidth - margin)}px`;
      tooltip.style.top = `${clamp(top, margin, window.innerHeight - tooltipHeight - margin)}px`;
    };

    const show = (point, event) => {
      activePoint = point;
      tooltip.textContent = point.dataset.tooltip || "";
      position(event, point);
      tooltip.classList.add("is-visible");
    };

    const maybePoint = (target) => target?.closest?.(".dotting-shift-point");

    root.addEventListener("pointerover", (event) => {
      const point = maybePoint(event.target);
      if (point && root.contains(point)) show(point, event);
    });

    root.addEventListener("pointermove", (event) => {
      if (activePoint) position(event, activePoint);
    });

    root.addEventListener("pointerout", (event) => {
      const point = maybePoint(event.target);
      const nextPoint = maybePoint(event.relatedTarget);
      if (point && point !== nextPoint) {
        activePoint = null;
        tooltip.classList.remove("is-visible");
      }
    });

    root.querySelectorAll(".dotting-shift-point").forEach((point) => {
      point.addEventListener("focus", () => show(point, null));
      point.addEventListener("blur", () => {
        activePoint = null;
        tooltip.classList.remove("is-visible");
      });
    });
  };

  const render = (root, rows) => {
    const canvas = root.querySelector("[data-dotting-shift-chart-canvas]");
    if (!canvas) return;

    const settings = chartSettings(root);
    const chartRows = rows.filter(
      (row) =>
        Number.isFinite(row.releaseYear) &&
        Number.isFinite(row.humanCorrectRate) &&
        row.releaseYear >= settings.xDomain[0] &&
        row.releaseYear <= settings.xDomain[1]
    );
    const scale = chartScales(settings);
    const frontierPath = bestSoFar(chartRows)
      .map((row, index) => `${index === 0 ? "M" : "L"} ${scale.x(row.releaseYear).toFixed(1)} ${scale.y(row.humanCorrectRate).toFixed(1)}`)
      .join(" ");

    const xTicks = settings.xTicks;
    const yTicks = [0, 0.25, 0.5, 0.75, 1];
    const labels = settings.labels;
    const anchorKeys = new Set(labels.map((label) => label.modelKey));
    const bandX = scale.x(2025.55);
    const bandWidth = scale.x(2026.05) - bandX;
    const trustY = scale.y(0.5);
    const bracketX = scale.x(2025.62);
    const bracketTop = scale.y(0.91);
    const bracketBottom = scale.y(0.51);
    const xLabelX = settings.isNarrow ? settings.padding + 150 : settings.width / 2;

    const labelMarkup = labels
      .map((label) => {
        const row = chartRows.find((candidate) => candidate.modelKey === label.modelKey);
        if (!row) return "";
        const x = scale.x(row.releaseYear);
        const y = scale.y(row.humanCorrectRate);
        const tx = clamp(x + label.dx, settings.padding + 10, settings.width - settings.padding - 10);
        const ty = clamp(y + label.dy, 34, settings.height - settings.padding - 10);
        const lineEndX = label.anchor === "end" ? tx + 8 : tx - 8;
        return `<g class="dotting-shift-annotation"><line x1="${x}" y1="${y}" x2="${lineEndX}" y2="${ty - 5}" /><text x="${tx}" y="${ty}" text-anchor="${label.anchor}">${escapeHtml(label.text)}</text></g>`;
      })
      .join("");

    canvas.innerHTML = `
      <div class="dotting-shift-scroll">
        <svg viewBox="0 0 ${settings.width} ${settings.height}" role="img" aria-label="Late 2025 Dottıng benchmark shift">
          <rect width="${settings.width}" height="${settings.height}" fill="transparent"></rect>
          <rect class="dotting-shift-band" x="${bandX}" y="${settings.padding}" width="${bandWidth}" height="${settings.height - settings.padding * 2}"></rect>
          ${yTicks
            .map(
              (tick) => `
                <line class="dotting-shift-grid" x1="${settings.padding}" x2="${settings.width - settings.padding}" y1="${scale.y(tick)}" y2="${scale.y(tick)}" />
                <text x="${settings.padding - 14}" y="${scale.y(tick) + 5}" text-anchor="end" class="dotting-shift-tick">${fmtPct(tick)}</text>
              `
            )
            .join("")}
          ${xTicks
            .map(
              (tick) => `
                <line class="dotting-shift-grid" x1="${scale.x(tick)}" x2="${scale.x(tick)}" y1="${settings.height - settings.padding}" y2="${settings.height - settings.padding + 6}" />
                <text x="${scale.x(tick)}" y="${settings.height - settings.padding + 28}" text-anchor="middle" class="dotting-shift-tick">${tick}</text>
              `
            )
            .join("")}
          <line class="dotting-shift-trust-line" x1="${settings.padding}" x2="${settings.width - settings.padding}" y1="${trustY}" y2="${trustY}" />
          <path class="dotting-shift-frontier-line" d="${frontierPath}" />
          <path class="dotting-shift-bracket" d="M ${bracketX + 16} ${bracketTop} H ${bracketX} V ${bracketBottom} H ${bracketX + 16}" />
          ${chartRows
            .map((row) => {
              const isAnchor = anchorKeys.has(row.modelKey);
              const tooltip = formatTooltip(row);
              return `<g class="dotting-shift-point" tabindex="0" role="listitem" data-tooltip="${escapeHtml(tooltip)}" aria-label="${escapeHtml(tooltip)}"><circle cx="${scale.x(row.releaseYear)}" cy="${scale.y(row.humanCorrectRate)}" r="5.4" fill="${familyColor(row)}" opacity="${isAnchor ? 0.94 : 0.36}" stroke="${isAnchor ? CHART.colors.ink : "transparent"}" stroke-width="${isAnchor ? 1.2 : 0}" /><title>${escapeHtml(tooltip)}</title></g>`;
            })
            .join("")}
          ${labelMarkup}
          <text x="${xLabelX}" y="${settings.height - 4}" text-anchor="middle" class="dotting-shift-axis-label">Model launch date</text>
          <text x="10" y="${settings.height / 2}" transform="rotate(-90 10 ${settings.height / 2})" text-anchor="middle" class="dotting-shift-axis-label">Human correct</text>
        </svg>
      </div>
      <div class="dotting-shift-legend">
        <span><i style="background:${CHART.colors.gpt}"></i>GPT Image</span>
        <span><i style="background:${CHART.colors.google}"></i>Gemini / Nano Banana</span>
        <span><i style="background:${CHART.colors.flux}"></i>FLUX</span>
        <span><i style="background:${CHART.colors.other}"></i>Other models</span>
      </div>
      <div class="dotting-shift-tooltip" role="tooltip"></div>
    `;
    root.classList.add("is-rendered");
    attachTooltip(root);
  };

  const init = async (root) => {
    if (root.dataset.dottingShiftRendered === "true") return;
    root.dataset.dottingShiftRendered = "true";

    try {
      const response = await fetch(root.dataset.source);
      if (!response.ok) throw new Error(`Chart data request failed: ${response.status}`);
      const payload = await response.json();
      render(root, payload.rows || []);
    } catch (error) {
      root.classList.add("has-chart-error");
      console.error("Unable to load Dottıng shift chart:", error);
    }
  };

  window.DottingShiftChart = {
    initAll() {
      document.querySelectorAll("[data-dotting-shift-chart]").forEach(init);
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.DottingShiftChart.initAll);
  } else {
    window.DottingShiftChart.initAll();
  }
})();
