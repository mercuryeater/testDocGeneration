export const context = {
  logoUrl: "/images/galderma-logo.png", // Asegúrate de que esta ruta sea correcta
  establishedYear: "1981",
  companyName: "Galderma de Colombia S.A",
  tin: "830012269-7",
  sentBy: "Maria Camila Osorio",
  sentTo: "Miguel Martinez and Mateo Robayo",
  observations:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed mollis dui. Duis pharetra viverra blandit. Suspendisse ornare, sem in porta porta, velit justo volutpat ipsum.",
  attachments: [
    { name: "Payment voucher 1", url: "#" },
    { name: "Payment voucher 2", url: "#" },
  ],
  totalPortfolio: "175.230",
  overduePortfolio: "34.230",
  overduePortfolioPercentage: "12",
  budget: "54.540",
  appliedCollection: "12.700",
  appliedCollectionPercentage: "12",
  unappliedPayments: "3.567",
  unappliedPaymentsPercentage: "12",
  creditLimit: "2.250",
  creditLimitPercentage: "12",
  dso: "75",
  invoiceStatus: [
    { label: "Unreconciled", amount: "54.950", count: "957" },
    { label: "Reconciled", amount: "48.410", count: "845" },
    { label: "Balances", amount: "39.350", count: "346" },
  ],
  alerts: [
    { label: "Open Novelties", amount: "26.370", count: "765" },
    { label: "Available DPP", amount: "29.680", count: "628" },
    { label: "Available CN", amount: "30.945", count: "751" },
  ],
  portfolioAges1: [
    { age: "Current", amount: "200,000,000", percentage: "12" },
    { age: "30 days", amount: "200,000,000", percentage: "12" },
    { age: "60 days", amount: "200,000,000", percentage: "12" },
  ],
  portfolioAges2: [
    { age: "90 days", amount: "200,000,000", percentage: "12" },
    { age: "120 days", amount: "200,000,000", percentage: "12" },
    { age: "+ 120 days", amount: "200,000,000", percentage: "12" },
  ],
  novelties: [
    { type: "Price differences", invoices: "5", pending: "35,700,900.00" },
    { type: "Filed out of dates", invoices: "6", pending: "35,700,900.00" },
    { type: "Delivery issues", invoices: "32", pending: "35,700,900.00" },
  ],
  totalNovelties: "340",
  totalNoveltiesAmount: "35,700,900.0",
  paymentAgreements: [
    {
      id: "328432",
      date: "07/31/2023",
      invoices: "5",
      pending: "35,700,900.00",
    },
    {
      id: "328433",
      date: "07/31/2023",
      invoices: "6",
      pending: "35,700,900.00",
    },
    {
      id: "328434",
      date: "07/31/2023",
      invoices: "32",
      pending: "35,700,900.00",
    },
  ],
  totalAgreements: "340",
  totalAgreementsAmount: "35,700,900.0",
};

export const ejsContext = {
  logoUrl:
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", // URL de ejemplo
  aplication_number: "APP-00123",
  balance_number: "BLC-00456",
  data_wallet: {
    client_name: "Cliente de Prueba S.A.S.",
    client_id: "900.123.456-7",
    date: new Date().toLocaleDateString("es-CO"),
    user_name: "Analista de Cartera",
    user_email: "analista@empresa.com",
  },
  client: {
    name: "Cliente de Prueba S.A.S.",
    nit: "900.123.456-7",
    contact: "Juan Pérez",
    address: "Calle Falsa 123, Bogotá",
    phone: "300 123 4567",
  },
  observations:
    "Estas son las observaciones de la aplicación de pago. Se requiere revisión de los ajustes aplicados.",
  attachments: [
    { name: "Soporte de pago 1", url: "#" },
    { name: "Factura 123", url: "#" },
    { name: "Otro documento", url: "#" },
  ],
  payments: [
    {
      type: "Transferencia",
      bank: "Bancolombia",
      accountNumber: "20455684535",
      document:
        "Estas son las observaciones de la aplicación de pago. Se requiere revisión de los ajustes aplicados.Estas son las observaciones de la aplicación de pago. Se requiere revisión de los ajustes aplicados.",
      paymentDate: "20/06/2025",
      appliedAmount: "1,500,000",
      evidenceUrl: "https://example.com/evidence/1",
    },
    {
      type: "Cheque",
      bank: "Davivienda",
      accountNumber: "20455684535",
      document:
        "DOC-002Estas son las observaciones de la aplicación de pago. Se requiere revisión de los ajustes aplicados.",
      paymentDate: "21/06/2025",
      appliedAmount: "750,000",
      evidenceUrl: "https://example.com/evidence/2",
    },
  ],
  get totalPayments() {
    // Usamos un getter para calcular el total dinámicamente
    const total = this.payments.reduce(
      (sum, p) => sum + parseFloat(p.appliedAmount.replace(/,/g, "")),
      0
    );
    return total.toLocaleString("es-CO");
  },
  invoices: [
    {
      document: "FV-001",
      totalValue: "1,000,000",
      adjustments: "50,000",
      applied: "950,000",
      balance: "0",
    },
    {
      document: "FV-002",
      totalValue: "800,000",
      adjustments: "0",
      applied: "800,000",
      balance: "0",
    },
    {
      document: "FV-003",
      totalValue: "500,000",
      adjustments: "100,000",
      applied: "400,000",
      balance: "0",
    },
  ],
  get invoicesTotalValue() {
    const total = this.invoices.reduce(
      (sum, i) => sum + parseFloat(i.totalValue.replace(/,/g, "")),
      0
    );
    return total.toLocaleString("es-CO");
  },
  get invoicesTotalAdjustments() {
    const total = this.invoices.reduce(
      (sum, i) => sum + parseFloat(i.adjustments.replace(/,/g, "")),
      0
    );
    return total.toLocaleString("es-CO");
  },
  get invoicesTotalApplied() {
    const total = this.invoices.reduce(
      (sum, i) => sum + parseFloat(i.applied.replace(/,/g, "")),
      0
    );
    return total.toLocaleString("es-CO");
  },
  get invoicesTotalBalance() {
    const total = this.invoices.reduce(
      (sum, i) => sum + parseFloat(i.balance.replace(/,/g, "")),
      0
    );
    return total.toLocaleString("es-CO");
  },
  adjustments: [
    {
      origin: "Diferencia de Precio",
      observations: "Se ajusta precio según acuerdo.",
      value: "50,000",
    },
    {
      origin: "Descuento Pronto Pago",
      observations: "Aplica DPP factura FV-003.",
      value: "100,000",
    },
  ],
  get totalAdjustments() {
    const total = this.adjustments.reduce(
      (sum, a) => sum + parseFloat(a.value.replace(/,/g, "")),
      0
    );
    return total.toLocaleString("es-CO");
  },
};

export const digitalRecordData = {
  // Logo y datos básicos
  logoUrl: "https://via.placeholder.com/140x70/0066cc/ffffff?text=LOGO",
  date: "22 de Agosto, 2025",

  // Información del cliente
  data_wallet: {
    client_name: "Empresa Ejemplo S.A.",
    client_id: "900.123.456-7",
    total_portfolio: "85,450,000",
    past_due_ammount: "12,340,000",
    budget_ammount: "95,000,000",
    applied_payments_amount: "45,230,000",
    unapplied_payments_amount: "3,450,000",
  },

  // Porcentajes para los indicadores
  percentages: {
    past_due_percentage: "14.4",
    applied_payments_percentage: "52.9",
    unapplied_payments_percentage: "4.0",
    quota_percentage: "89.9",
  },

  // Indicadores adicionales
  quota: "85,400,000",
  dso: "42",

  // Información del email
  sentBy: "Ana Martínez - Gerente de Cuenta",
  sentTo: "carlos.rodriguez@empresaejemplo.com",
  observations:
    "Se adjunta el estado de cuenta correspondiente al mes de agosto 2025. Por favor revisar las facturas vencidas marcadas en rojo. Se requiere actualización del acuerdo de pago ID-2025-003 antes del 30 de agosto.",

  // Adjuntos
  attachments: [
    { name: "Estado_Cuenta_Agosto_2025.pdf", url: "#" },
    { name: "Detalle_Facturas_Vencidas.xlsx", url: "#" },
    { name: "Propuesta_Acuerdo_Pago.pdf", url: "#" },
  ],

  // Información de facturas
  info_invioce: {
    total_invoice_unreconciled: {
      total_value: "15,670,000",
      count: "23",
    },
    total_invoice_reconciled: {
      total_value: "42,380,000",
      count: "87",
    },
    total_balances: {
      total_value: "27,400,000",
      count: "110",
    },
  },

  // Alertas de facturas
  invoice_alerts: {
    accounting_updates: {
      total_value: "8,450,000",
      count: "12",
    },
    financial_discounts: {
      discount: {
        total_value: "2,340,000",
        count: "8",
      },
      creditNote: {
        total_value: "1,230,000",
        count: "5",
      },
    },
  },

  // Edades de cartera - Primera tabla
  portfolioAges1: [
    { age: "Corriente", amount: "45,230,000", percentage: "52.9" },
    { age: "1-30 días", amount: "15,670,000", percentage: "18.3" },
    { age: "31-60 días", amount: "8,450,000", percentage: "9.9" },
    { age: "61-90 días", amount: "5,340,000", percentage: "6.2" },
  ],

  // Edades de cartera - Segunda tabla
  portfolioAges2: [
    { age: "91-120 días", amount: "4,230,000", percentage: "4.9" },
    { age: "121-180 días", amount: "3,450,000", percentage: "4.0" },
    { age: "181-360 días", amount: "2,340,000", percentage: "2.7" },
    { age: "+360 días", amount: "740,000", percentage: "0.9" },
  ],

  // Novedades
  novelties: [
    { type: "Descuento por pronto pago", invoices: "8", pending: "2,340,000" },
    { type: "Notas crédito pendientes", invoices: "5", pending: "1,230,000" },
    { type: "Devoluciones en proceso", invoices: "3", pending: "890,000" },
    { type: "Ajustes de precio", invoices: "7", pending: "1,560,000" },
    { type: "Reclamaciones abiertas", invoices: "4", pending: "2,100,000" },
  ],
  totalNovelties: "27",
  totalNoveltiesAmount: "8,120,000",

  // Acuerdos de pago
  paymentAgreements: [
    {
      id: "AP-2025-001",
      date: "15/09/2025",
      invoices: "12",
      pending: "15,670,000",
    },
    {
      id: "AP-2025-002",
      date: "30/09/2025",
      invoices: "8",
      pending: "8,450,000",
    },
    {
      id: "AP-2025-003",
      date: "15/10/2025",
      invoices: "15",
      pending: "12,340,000",
    },
    {
      id: "AP-2025-004",
      date: "30/10/2025",
      invoices: "6",
      pending: "5,230,000",
    },
  ],
  totalAgreements: "4",
  totalAgreementsAmount: "41,690,000",
};
