(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/formations/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FormationsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function FormationsPage() {
    _s();
    const [formations, setFormations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [paying, setPaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FormationsPage.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].formations.list().then(setFormations).catch({
                "FormationsPage.useEffect": ()=>setError('Impossible de charger les formations.')
            }["FormationsPage.useEffect"]).finally({
                "FormationsPage.useEffect": ()=>setLoading(false)
            }["FormationsPage.useEffect"]);
        }
    }["FormationsPage.useEffect"], []);
    const handleBuy = async (f, method)=>{
        if (!user) {
            router.push('/login');
            return;
        }
        setPaying(f.id);
        try {
            if (method === 'stripe') {
                const { url } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].payments.stripeCheckout(f.id, f.price, f.title);
                window.location.href = url;
            } else {
                const { url } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].payments.paypalCreate(f.id, f.price, f.title);
                window.location.href = url;
            }
        } catch (e) {
            alert(e instanceof Error ? e.message : 'Erreur paiement');
            setPaying(null);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            background: '#f7f8fa'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'white',
                    borderBottom: '3px solid #C8102E',
                    padding: '32px 0 24px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '32px',
                                        height: '3px',
                                        background: '#C8102E',
                                        borderRadius: '2px'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/formations/page.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: 'Montserrat,sans-serif',
                                        fontWeight: 700,
                                        fontSize: '11px',
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        color: '#C8102E'
                                    },
                                    children: "Catalogue"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/formations/page.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/formations/page.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontFamily: 'Montserrat,sans-serif',
                                fontWeight: 900,
                                fontSize: 'clamp(26px,4vw,40px)',
                                color: '#1a1a1a',
                                marginBottom: '8px'
                            },
                            children: [
                                "Nos ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#C8102E'
                                    },
                                    children: "Formations"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/formations/page.tsx",
                                    lineNumber: 55,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/formations/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: '#888',
                                fontSize: '15px'
                            },
                            children: "Investissez dans votre développement avec des programmes d'excellence"
                        }, void 0, false, {
                            fileName: "[project]/src/app/formations/page.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/formations/page.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/formations/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container",
                style: {
                    padding: 'clamp(24px,4vw,40px) 24px'
                },
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "loading-spinner"
                    }, void 0, false, {
                        fileName: "[project]/src/app/formations/page.tsx",
                        lineNumber: 65,
                        columnNumber: 21
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(200,16,46,0.05)',
                            border: '1px solid rgba(200,16,46,0.2)',
                            borderLeft: '4px solid #C8102E',
                            borderRadius: '6px',
                            padding: '14px 18px',
                            marginBottom: '24px',
                            color: '#C8102E',
                            fontSize: '14px'
                        },
                        children: "Le backend n'est pas connecté. La formation ci-dessous est disponible."
                    }, void 0, false, {
                        fileName: "[project]/src/app/formations/page.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '32px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: 'white',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1px solid #e0e2e6',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        height: '180px',
                                        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0010 50%, #0d0005 100%)',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                inset: 0,
                                                backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(200,16,46,0.25) 0%, transparent 65%)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/formations/page.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                inset: 0,
                                                backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 30px)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/formations/page.tsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: 'center',
                                                zIndex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "48",
                                                    height: "48",
                                                    viewBox: "0 0 48 48",
                                                    fill: "none",
                                                    style: {
                                                        marginBottom: '8px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                            x: "8",
                                                            y: "14",
                                                            width: "32",
                                                            height: "24",
                                                            rx: "4",
                                                            stroke: "rgba(255,255,255,0.3)",
                                                            strokeWidth: "2",
                                                            fill: "none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/formations/page.tsx",
                                                            lineNumber: 95,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                            x: "14",
                                                            y: "8",
                                                            width: "20",
                                                            height: "8",
                                                            rx: "2",
                                                            stroke: "rgba(255,255,255,0.3)",
                                                            strokeWidth: "2",
                                                            fill: "none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/formations/page.tsx",
                                                            lineNumber: 96,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            cx: "18",
                                                            cy: "26",
                                                            r: "3",
                                                            fill: "#C8102E"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/formations/page.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            cx: "30",
                                                            cy: "26",
                                                            r: "3",
                                                            fill: "#C8102E"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/formations/page.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M20 32h8",
                                                            stroke: "rgba(255,255,255,0.5)",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/formations/page.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                            x1: "24",
                                                            y1: "8",
                                                            x2: "24",
                                                            y2: "4",
                                                            stroke: "rgba(255,255,255,0.3)",
                                                            strokeWidth: "2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/formations/page.tsx",
                                                            lineNumber: 100,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            cx: "24",
                                                            cy: "3",
                                                            r: "2",
                                                            fill: "rgba(255,255,255,0.4)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/formations/page.tsx",
                                                            lineNumber: 101,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/formations/page.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontFamily: 'Montserrat,sans-serif',
                                                        fontWeight: 700,
                                                        fontSize: '11px',
                                                        color: 'rgba(255,255,255,0.4)',
                                                        letterSpacing: '0.2em',
                                                        textTransform: 'uppercase'
                                                    },
                                                    children: "Intelligence Artificielle"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/formations/page.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/formations/page.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                top: '14px',
                                                right: '14px',
                                                display: 'flex',
                                                gap: '6px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: '#C8102E',
                                                        color: 'white',
                                                        fontFamily: 'Montserrat,sans-serif',
                                                        fontWeight: 700,
                                                        fontSize: '10px',
                                                        padding: '3px 10px',
                                                        borderRadius: '3px',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.08em'
                                                    },
                                                    children: "Formation Pro"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/formations/page.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: 'rgba(126,200,42,0.2)',
                                                        color: '#7EC82A',
                                                        border: '1px solid rgba(126,200,42,0.4)',
                                                        fontFamily: 'Montserrat,sans-serif',
                                                        fontWeight: 700,
                                                        fontSize: '10px',
                                                        padding: '3px 10px',
                                                        borderRadius: '3px',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.08em'
                                                    },
                                                    children: "CPF"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/formations/page.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/formations/page.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                bottom: '14px',
                                                left: '18px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: 'white',
                                                        color: '#C8102E',
                                                        fontFamily: 'Montserrat,sans-serif',
                                                        fontWeight: 900,
                                                        fontSize: '13px',
                                                        padding: '4px 12px',
                                                        borderRadius: '4px'
                                                    },
                                                    children: "490 €"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/formations/page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: 'rgba(255,255,255,0.5)',
                                                        fontSize: '12px',
                                                        fontFamily: 'Montserrat,sans-serif'
                                                    },
                                                    children: "20 heures · Distanciel"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/formations/page.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/formations/page.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/formations/page.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: 'clamp(16px,3vw,28px)',
                                        display: 'flex',
                                        gap: '24px',
                                        alignItems: 'flex-start',
                                        flexWrap: 'wrap'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1,
                                                minWidth: '240px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontFamily: 'Montserrat,sans-serif',
                                                        fontWeight: 900,
                                                        fontSize: 'clamp(16px,2.5vw,20px)',
                                                        marginBottom: '10px',
                                                        color: '#1a1a1a',
                                                        lineHeight: 1.3
                                                    },
                                                    children: "IA appliquée au Marketing de Réseau"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/formations/page.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        color: '#777',
                                                        fontSize: '14px',
                                                        lineHeight: 1.7,
                                                        marginBottom: '16px'
                                                    },
                                                    children: "Intégrez l'intelligence artificielle dans votre activité commerciale. 5 modules pratiques pour maîtriser la prospection, le contenu, la conversion et l'automatisation."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/formations/page.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        gap: '8px',
                                                        flexWrap: 'wrap'
                                                    },
                                                    children: [
                                                        '5 modules',
                                                        '20h',
                                                        'Distanciel',
                                                        '12-20 pers.'
                                                    ].map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                background: '#f0f1f3',
                                                                color: '#555',
                                                                fontFamily: 'Montserrat,sans-serif',
                                                                fontWeight: 700,
                                                                fontSize: '11px',
                                                                padding: '4px 10px',
                                                                borderRadius: '4px',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.06em'
                                                            },
                                                            children: tag
                                                        }, tag, false, {
                                                            fileName: "[project]/src/app/formations/page.tsx",
                                                            lineNumber: 132,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/formations/page.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/formations/page.tsx",
                                            lineNumber: 123,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '8px',
                                                flexShrink: 0,
                                                minWidth: '180px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/formations/ia-marketing-reseau",
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '8px',
                                                        background: '#C8102E',
                                                        color: 'white',
                                                        fontFamily: 'Montserrat,sans-serif',
                                                        fontWeight: 700,
                                                        fontSize: '13px',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.06em',
                                                        padding: '12px 24px',
                                                        borderRadius: '6px'
                                                    },
                                                    children: [
                                                        "Voir le programme",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "14",
                                                            height: "14",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2.5",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M5 12h14M12 5l7 7-7 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/formations/page.tsx",
                                                                lineNumber: 145,
                                                                columnNumber: 119
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/formations/page.tsx",
                                                            lineNumber: 145,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/formations/page.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/formations/ia-marketing-reseau/inscription",
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: '10px 24px',
                                                        border: '1.5px solid #e0e2e6',
                                                        borderRadius: '6px',
                                                        fontFamily: 'Montserrat,sans-serif',
                                                        fontWeight: 700,
                                                        fontSize: '12px',
                                                        color: '#555',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em'
                                                    },
                                                    children: "S'inscrire"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/formations/page.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/formations/page.tsx",
                                            lineNumber: 136,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/formations/page.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/formations/page.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/formations/page.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    !loading && formations.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid-2",
                        children: formations.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormationCard, {
                                formation: f,
                                index: i,
                                paying: paying === f.id,
                                onBuy: handleBuy,
                                isLoggedIn: !!user
                            }, f.id, false, {
                                fileName: "[project]/src/app/formations/page.tsx",
                                lineNumber: 164,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/formations/page.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/formations/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/formations/page.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(FormationsPage, "gUCoHyP+eDZxdj1zslh0fJAts90=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = FormationsPage;
function FormationCard({ formation: f, index, paying, onBuy, isLoggedIn }) {
    _s1();
    const [showPayOptions, setShowPayOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card",
        style: {
            overflow: 'hidden',
            animation: `fadeUp 0.5s ease ${index * 0.1}s both`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 'clamp(160px,20vw,220px)',
                    background: f.imageUrl ? `url(${f.imageUrl}) center/cover` : 'linear-gradient(135deg, #1a0202 0%, #2a0a0a 100%)',
                    position: 'relative'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/formations/page.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: '14px',
                            left: '18px',
                            fontFamily: 'Montserrat,sans-serif',
                            fontWeight: 900,
                            fontSize: 'clamp(18px,3vw,24px)',
                            color: '#C8102E',
                            background: 'white',
                            padding: '4px 12px',
                            borderRadius: '4px'
                        },
                        children: f.price.toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'EUR'
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/formations/page.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/formations/page.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: 'clamp(16px,3vw,24px)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontSize: 'clamp(16px,2.5vw,20px)',
                            marginBottom: '10px',
                            fontFamily: 'Montserrat,sans-serif',
                            fontWeight: 800
                        },
                        children: f.title
                    }, void 0, false, {
                        fileName: "[project]/src/app/formations/page.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: '#777',
                            fontSize: '14px',
                            lineHeight: 1.7,
                            marginBottom: '20px'
                        },
                        children: f.description
                    }, void 0, false, {
                        fileName: "[project]/src/app/formations/page.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    !showPayOptions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>isLoggedIn ? setShowPayOptions(true) : onBuy(f, 'stripe'),
                        disabled: paying,
                        className: "btn btn-primary",
                        style: {
                            width: '100%',
                            justifyContent: 'center'
                        },
                        children: paying ? 'Redirection...' : isLoggedIn ? 'Acheter cette formation' : 'Se connecter pour acheter'
                    }, void 0, false, {
                        fileName: "[project]/src/app/formations/page.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onBuy(f, 'stripe'),
                                disabled: paying,
                                className: "btn btn-primary",
                                style: {
                                    justifyContent: 'center'
                                },
                                children: paying ? 'Redirection...' : 'Payer par carte (Stripe)'
                            }, void 0, false, {
                                fileName: "[project]/src/app/formations/page.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onBuy(f, 'paypal'),
                                disabled: paying,
                                style: {
                                    background: '#f0a500',
                                    color: '#1a1a1a',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '13px',
                                    cursor: 'pointer',
                                    fontFamily: 'Montserrat,sans-serif',
                                    fontWeight: 700,
                                    fontSize: '13px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                },
                                children: paying ? 'Redirection...' : 'Payer via PayPal'
                            }, void 0, false, {
                                fileName: "[project]/src/app/formations/page.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowPayOptions(false),
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    color: '#aaa',
                                    fontSize: '13px',
                                    textDecoration: 'underline',
                                    cursor: 'pointer'
                                },
                                children: "Annuler"
                            }, void 0, false, {
                                fileName: "[project]/src/app/formations/page.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/formations/page.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/formations/page.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`
            }, void 0, false, {
                fileName: "[project]/src/app/formations/page.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/formations/page.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
_s1(FormationCard, "Q9O1gJxhiPAgPtmEgqneqx8aRhA=");
_c1 = FormationCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "FormationsPage");
__turbopack_context__.k.register(_c1, "FormationCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_formations_page_tsx_1f7rd7k._.js.map