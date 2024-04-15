import { Ctx } from "../../../DataContext";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import ServiceAccessPage from "../ServiceAccessPage";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { executeCommand } from "../../../commons/utilsFunctions";

beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => { });
    jest.spyOn(console, "warn").mockImplementation(() => { });
});

describe("Service Access Page Tests", () => {

    const originalFetch = global.fetch;

    const abortController = jest.fn();
    const setResponseProcess = jest.fn();
    const transactionData = jest.fn();
    const panInfo = {
        panInfo: [
            {
                pan: "1234567891234567",
                circuits: [
                    "VISA"
                ],
                bankName: "ISYBANK"
            }, {
                pan: "8234567891234565",
                circuits: [
                    "BANCOMAT",
                    "VISA"
                ],
                bankName: "INTESA"
            }
        ]
    };
    const ibanList = {
        IBANlist: [
            {
                IBAN: "IT12A1234512345123456789012",
                bankName: "INTESA"
            },
            {
                IBAN: "IT12A1234512345123456789018",
                bankName: "POSTE"
            }
        ]
    };
    const content = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSIgPz4NCjwhRE9DVFlQRSBodG1sIFBVQkxJQyAiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIFRyYW5zaXRpb25hbC8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvRFREL3hodG1sMS10cmFuc2l0aW9uYWwuZHRkIj4NCjxodG1sIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIj4NCjxoZWFkPjxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iY3NzL2VtdWxhdG9yZS5jc3MiIC8+PC9oZWFkPg0KPGJvZHk+DQoJDQoJDQoJDQoJPGltZyBpZD0ibG9nbyIgc3JjPSJodHRwczovL2QyeGR1eTd0Ymd1MmQzLmNsb3VkZnJvbnQubmV0L2ZpbGVzL0lDT04vZGVmYXVsdF9sb2dvLnN2ZyIvPg0KCTxoMT5TZXJ2aXppIGRpIHB1YmJsaWNhIHV0aWxpdCZhZ3JhdmU7PC9oMT4JDQoJPGgyPkluc2VyaXNjaSBpbCBjb2RpY2UgYXZ2aXNvPC9oMj4NCgk8aDM+SGEgMTggY2lmcmUsIGxvIHRyb3ZpIHZpY2lubyBhbCBjb2RpY2UgUVIuPC9oMz4NCgkNCgk8bGFiZWwgY2xhc3M9ImxhcmdlIj5Db2RpY2UgQXZ2aXNvDQogICAgICA8aW5wdXQgdHlwZT0idGV4dCIgaWQ9ImNvZGljZUF2dmlzbyIgdmFsdWU9IiIgcGF0dGVybj0iXlxkezE4fSQiICAvPg0KCSA8L2xhYmVsPg0KCQ0KCTxidXR0b24gY2xhc3M9Im5lZ2F0aXZlIiBkYXRhLWZkaz0iUzQiIGlkPSJleGl0Ij4NCiAgICAgIDxzcGFuPkVzY2k8L3NwYW4+DQogICAgPC9idXR0b24+DQoJDQoJPGJ1dHRvbiBjbGFzcz0icG9zaXRpdmUiIGRhdGEtZmRrPSJTOCIgaWQ9ImNvbmZpcm0iPg0KICAgICAgPHNwYW4+Q29uZmVybWE8L3NwYW4+DQogICAgPC9idXR0b24+CQ0KCQ0KCQ0KCTwvYm9keT4NCgkNCjwvaHRtbD4=";

    function getTestResponse(timeout: number | null, command?: string, content?: string) {
        return {
            outcome: {
                description: "The operation completed successfully",
                result: "OK"
            },
            task: {
                buttons: [
                    {
                        data: {
                            continue: true,
                            functionId: "SPONTANEOUS_PAYMENT"
                        },
                        id: "pagamentoAviso"
                    }
                ],
                id: "be7f70a2-8ebd-11ee-9b34-eaafaf73ed90",
                onError: {
                    errorCode: "31",
                    errorDescription: "error on menu.html"
                },
                onTimeout: {
                    errorCode: "27",
                    errorDescription: "timeout on menu.html"
                },
                template: {
                    content
                },
                timeout: timeout,
                command: command,
                receiptTemplate: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPGh0bWwgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiPg0KCTxib2R5Pg0KCQk8cD4NCgkJCTxzcGFuIGNsYXNzPSJjZW50ZXIgYm9sZCI+UmljZXZ1dGEgZGkgcGFnYW1ldG8gcGFnb1BBPC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4+PC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4gY2xhc3M9ImxlZnQiPkVudGUgY3JlZGl0b3JlOjwvc3Bhbj4NCgkJPC9wPg0KCQk8cD4NCgkJCTxzcGFuIGNsYXNzPSJsZWZ0IGJvbGQiPmNvbXBhbnlOYW1lPC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4+PC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4gY2xhc3M9ImxlZnQiPkNvZGljZSBGaXNjYWxlIEVudGUgQ3JlZGl0b3JlOjwvc3Bhbj4NCgkJPC9wPg0KCQk8cD4NCgkJCTxzcGFuIGNsYXNzPSJsZWZ0IGJvbGQiPjAwMDAwMDAwMjAxPC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4+PC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4gY2xhc3M9ImxlZnQiPkNvZGljZSBhdnZpc286PC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4gY2xhc3M9ImxlZnQgYm9sZCI+MDEyMzQ1Njc4OTAxMjM0NTY3PC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4+PC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4gY2xhc3M9ImxlZnQiPk9nZ2V0dG8gZGVsIHBhZ2FtZW50bzo8L3NwYW4+DQoJCTwvcD4NCgkJPHA+DQoJCQk8c3BhbiBjbGFzcz0ibGVmdCBib2xkIj5QYWdhbWVudG8gZGkgVGVzdDwvc3Bhbj4NCgkJPC9wPg0KCQk8cD4NCgkJCTxzcGFuPjwvc3Bhbj4NCgkJPC9wPg0KCQk8cD4NCgkJCTxzcGFuIGNsYXNzPSJsZWZ0Ij5JbXBvcnRvOjwvc3Bhbj4NCgkJPC9wPg0KCQk8cD4NCgkJCTxzcGFuIGNsYXNzPSJsZWZ0IGJvbGQiPjEwMCwwMCAmIzgzNjQ7PC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4gY2xhc3M9ImNlbnRlciI+X19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX188L3NwYW4+DQoJCTwvcD4NCgkJPHA+DQoJCQk8c3BhbiBjbGFzcz0ibGVmdCI+Q29tbWlzc2lvbmU6PC9zcGFuPg0KCQkJPHNwYW4gY2xhc3M9InJpZ2h0IGJvbGQiPjAsNTAgJiM4MzY0Ozwvc3Bhbj4NCgkJPC9wPg0KCQk8cD4NCgkJCTxzcGFuIGNsYXNzPSJsZWZ0IGJvbGQiPlRvdGFsZTo8L3NwYW4+DQoJCQk8c3BhbiBjbGFzcz0icmlnaHQgYm9sZCI+MTAwLDUwICYjODM2NDs8L3NwYW4+DQoJCTwvcD4NCgkJPHA+DQoJCQk8c3BhbiBjbGFzcz0iY2VudGVyIj5fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXzwvc3Bhbj4NCgkJPC9wPg0KCQk8cD4NCgkJCTxzcGFuPjwvc3Bhbj4NCgkJPC9wPg0KCQk8cD4NCgkJCTxzcGFuIGNsYXNzPSJjZW50ZXIiPlBhZ2FtZW50byBnZXN0aXRvIGRhOjwvc3Bhbj4NCgkJPC9wPg0KCQk8cD4NCgkJCTxzcGFuIGNsYXNzPSJjZW50ZXIiPk5leGkgUGF5bWVudHMgUy5wLkEuPC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4gY2xhc3M9ImNlbnRlciI+Q29yc28gU2VtcGlvbmUsIDU1ICZtaWRkb3Q7IDIwMTQ5LCBNaWxhbm88L3NwYW4+DQoJCTwvcD4NCgkJPHA+DQoJCQk8c3Bhbj48L3NwYW4+DQoJCTwvcD4NCgkJPHA+DQoJCQk8c3BhbiBjbGFzcz0iY2VudGVyIj5SaWNldnV0YSB0cmFzbWVzc2EgZGE6PC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4gY2xhc3M9ImNlbnRlciI+UGFnb1BBIFMucC5BLjwvc3Bhbj4NCgkJPC9wPg0KCQk8cD4NCgkJCTxzcGFuIGNsYXNzPSJjZW50ZXIiPlBpYXp6YSBDb2xvbm5hLCAzNzAgJm1pZGRvdDsgMDAxODcsIFJvbWEgPC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4gY2xhc3M9ImNlbnRlciI+SUQgVHJhbnNhemlvbmU6PC9zcGFuPg0KCQk8L3A+DQoJCTxwPg0KCQkJPHNwYW4gY2xhc3M9ImNlbnRlciI+N0wxMXNqd2pKWmtTNE45ckJmeWZxRmNqckpaSTN6eGc8L3NwYW4+DQoJCTwvcD4NCgk8L2JvZHk+DQo8L2h0bWw+"
            },
            transactionId: "06789-12345-0001-64874412-1698769800000-e0f9b7bd-6"
        };
    }

    function getMenuTestResponseShort() {
        return {
            task: {
                id: "b144d5ea-f657-11ee-b11b-ee47e442d0d9",
                data: {
                    functionId: "SERVIZI_PAGOPA"
                },
                onError: {
                    errorCode: "31",
                    errorDescription: "error on menu.html"
                },
                timeout: 30,
                onTimeout: {
                    errorCode: "27",
                    errorDescription: "timeout on menu.html"
                },
                template: {
                    content: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgVHJhbnNpdGlvbmFsLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGQiPg0KPGh0bWwgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiPg0KDQo8Ym9keT4JDQoJPGltZyBpZD0ibG9nbyIgc3JjPSJodHRwczovL2QyeGR1eTd0Ymd1MmQzLmNsb3VkZnJvbnQubmV0L2ZpbGVzL0lDT04vZGVmYXVsdF9sb2dvLnN2ZyIgLz4NCgk8aDE+U2Vydml6aSBkaSBwdWJibGljYSB1dGlsaXQmIzIyNDs8L2gxPgkNCgk8aDI+QSBxdWFsZSBzZXJ2aXppbyB2dW9pIGFjY2VkZXJlPzwvaDI+DQoJPGgzPlB1b2kgZWZmZXR0dWFyZSBwYWdhbWVudGkgdmVyc28gbGEgUEEgZSBnZXN0aXJlIGxlIHR1ZSBpbml6aWF0aXZlIGRpIHdlbGZhcmUuPC9oMz4NCgk8dWwgaWQ9Im1lbnUiPg0KCQk8bGkgaWQ9InBhZ2FtZW50b0F2dmlzbyI+CQ0KCQkJPHNwYW4+UGFnYSB1biBhdnZpc28gcGFnb1BBPC9zcGFuPg0KCQkJPGltZyBzcmM9Imh0dHBzOi8vZDJ4ZHV5N3RiZ3UyZDMuY2xvdWRmcm9udC5uZXQvZmlsZXMvSUNPTi9wYWdvUEEuc3ZnIiAvPg0KCQk8L2xpPgkNCgkJPGxpIGlkPSJpbml6aWF0aXZlSURQYXkiPgkNCgkJCTxzcGFuPkdlc3Rpc2NpIGxlIGluaXppYXRpdmUgSUQgUGF5PC9zcGFuPg0KCQkJPGltZyBzcmM9Imh0dHBzOi8vZDJ4ZHV5N3RiZ3UyZDMuY2xvdWRmcm9udC5uZXQvZmlsZXMvSUNPTi9JRFBheS5zdmciIC8+DQoJCTwvbGk+CQkJCQ0KCTx1bD48L3VsPg0KCQ0KCTxidXR0b24gY2xhc3M9InBvc2l0aXZlIiBkYXRhLWZkaz0iUzQiIGlkPSJleGl0Ij4NCiAgICAgIDxzcGFuPkVzY2k8L3NwYW4+DQogICAgPC9idXR0b24+DQoNCgk8L3VsPjwvYm9keT4NCgkNCjwvaHRtbD4=",
                    type: "MENU"
                },
                buttons: [
                    {
                        id: "exit",
                        data: {
                            continue: false
                        }
                    },
                    {
                        id: "iniziativeIDPay",
                        data: {
                            continue: true,
                            functionId: "INIZIATIVE_IDPAY"
                        }
                    },
                    {
                        id: "pagamentoAvviso",
                        data: {
                            continue: true,
                            functionId: "PAGAMENTO_AVVISI"
                        }
                    }
                ]
            },
            transactionId: "06789-12345-0001-64874412-1712656696000-86c01abd-5",
            outcome: {
                result: "OK",
                description: "The operation completed successfully"
            }
        };
    }

    function getMenuTestResponseLong() {
        return {
            task: {
                id: "608b33eb-f661-11ee-b11b-ee47e442d0d9",
                data: {
                    functionId: "PAGAMENTO_AVVISI",
                    debtPosition: "[{paTaxCode=00000000201, noticeNumber=012345678901234562, amount=12345, description=Description 62}, {paTaxCode=00000000201, noticeNumber=012345678901234561, amount=12345, description=Description 61, dueDate=}, {paTaxCode=00000000201, noticeNumber=012345678901234567, amount=12345, description=Description 67, dueDate=2025-11-10}, {paTaxCode=00000000201, noticeNumber=012345678901234560, amount=12345, description=Description 60, dueDate=2025-03-24}, {paTaxCode=15376371009, noticeNumber=485564829563528563, amount=12345, description=Health ticket for chest x-ray, dueDate=2024-04-04}, {paTaxCode=00000000201, noticeNumber=485564829563528563, amount=12345, description=Description 63, dueDate=2022-11-11}]"
                },
                onError: {
                    errorCode: "31",
                    errorDescription: "error on inputCodiceAttoEnte.html"
                },
                timeout: 60,
                onTimeout: {
                    errorCode: "27",
                    errorDescription: "timeout on inputCodiceAttoEnte.html"
                },
                template: {
                    content: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgVHJhbnNpdGlvbmFsLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGQiPg0KPGh0bWwgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiPg0KDQo8Ym9keT4JDQoJPGltZyBpZD0ibG9nbyIgc3JjPSJodHRwczovL2QyeGR1eTd0Ymd1MmQzLmNsb3VkZnJvbnQubmV0L2ZpbGVzL0lDT04vZGVmYXVsdF9sb2dvLnN2ZyIgLz4NCgk8aDE+U2Vydml6aSBkaSBwdWJibGljYSB1dGlsaXQmIzIyNDs8L2gxPgkNCgk8aDI+UXVhbGUgYXZ2aXNvIHZ1b2kgcGFnYXJlPzwvaDI+DQoJPGgzPlNlbGV6aW9uYSB1biBhdnZpc28gdHJhIGwnZWxlbmNvIGRlbGxlIHR1ZSBwb3NpemlvbmkgZGViaXRvcmllIHByZXNlbnRpIG5lbCBub3N0cm8gYXJjaGl2aW8gY2VudHJhbGl6emF0byBvcHB1cmUgZXNlZ3VpIHVuIHBhZ2FtZW50byBzcG9udGFuZW8gY29uIGwnYXZ2aXNvIGluIHR1byBwb3NzZXNzby48L2gzPg0KCTx1bCBpZD0ibWVudSI+DQoJCQ0KCQkJPGxpIGlkPSIwMDAwMDAwMDIwMS00ODU1NjQ4Mjk1NjM1Mjg1NjMiPgkJCQkJDQoJCQkJPHNwYW4gY2xhc3M9InNtYWxsIHJpZ2h0Ij4yMDIyLTExLTExPC9zcGFuPgkNCgkJCQk8c3Bhbj5EZXNjcmlwdGlvbiA2Mzwvc3Bhbj4JCQkJCQ0KCQkJPC9saT4JDQoJCQ0KCQkJPGxpIGlkPSIxNTM3NjM3MTAwOS00ODU1NjQ4Mjk1NjM1Mjg1NjMiPgkJCQkJDQoJCQkJPHNwYW4gY2xhc3M9InNtYWxsIHJpZ2h0Ij4yMDI0LTA0LTA0PC9zcGFuPgkNCgkJCQk8c3Bhbj5IZWFsdGggdGlja2V0IGZvciBjaGVzdCB4LXJheTwvc3Bhbj4JCQkJCQ0KCQkJPC9saT4JDQoJCQ0KCQkJPGxpIGlkPSIwMDAwMDAwMDIwMS0wMTIzNDU2Nzg5MDEyMzQ1NjAiPgkJCQkJDQoJCQkJPHNwYW4gY2xhc3M9InNtYWxsIHJpZ2h0Ij4yMDI1LTAzLTI0PC9zcGFuPgkNCgkJCQk8c3Bhbj5EZXNjcmlwdGlvbiA2MDwvc3Bhbj4JCQkJCQ0KCQkJPC9saT4JDQoJCQ0KCQkJPGxpIGlkPSIwMDAwMDAwMDIwMS0wMTIzNDU2Nzg5MDEyMzQ1NjciPgkJCQkJDQoJCQkJPHNwYW4gY2xhc3M9InNtYWxsIHJpZ2h0Ij4yMDI1LTExLTEwPC9zcGFuPgkNCgkJCQk8c3Bhbj5EZXNjcmlwdGlvbiA2Nzwvc3Bhbj4JCQkJCQ0KCQkJPC9saT4JDQoJCQ0KCQkJPGxpIGlkPSIwMDAwMDAwMDIwMS0wMTIzNDU2Nzg5MDEyMzQ1NjEiPgkJCQkJDQoJCQkJPHNwYW4gY2xhc3M9InNtYWxsIHJpZ2h0Ij48L3NwYW4+CQ0KCQkJCTxzcGFuPkRlc2NyaXB0aW9uIDYxPC9zcGFuPgkJCQkJDQoJCQk8L2xpPgkNCgkJDQoJCQk8bGkgaWQ9IjAwMDAwMDAwMjAxLTAxMjM0NTY3ODkwMTIzNDU2MiI+CQkJCQkNCgkJCQk8c3BhbiBjbGFzcz0ic21hbGwgcmlnaHQiPjwvc3Bhbj4JDQoJCQkJPHNwYW4+RGVzY3JpcHRpb24gNjI8L3NwYW4+CQkJCQkNCgkJCTwvbGk+CQ0KCQkJCQkJDQoJPHVsPjwvdWw+DQoJDQoJPGJ1dHRvbiBjbGFzcz0ibmVnYXRpdmUiIGRhdGEtZmRrPSJTNCIgaWQ9ImJhY2siPg0KICAgICAgPHNwYW4+SW5kaWV0cm88L3NwYW4+DQogICAgPC9idXR0b24+DQoJDQoJPGJ1dHRvbiBjbGFzcz0icG9zaXRpdmUiIGRhdGEtZmRrPSJTOCIgaWQ9InBhZ2FtZW50b0F2dmlzbyI+DQogICAgICA8c3Bhbj5QYWdhbWVudG8gc3BvbnRhbmVvPC9zcGFuPg0KICAgIDwvYnV0dG9uPg0KCQ0KCTxidXR0b24gY2xhc3M9InBvc2l0aXZlIiBpZD0iZXhpdCI+DQogICAgICA8c3Bhbj5Fc2NpPC9zcGFuPg0KICAgIDwvYnV0dG9uPg0KDQoJPC91bD48L2JvZHk+DQoJDQo8L2h0bWw+",
                    type: "MENU"
                },
                buttons: [
                    {
                        id: "exit",
                        data: {
                            continue: false,
                            inserimentoDatiAvviso: false
                        }
                    },
                    {
                        id: "pagamentoAvviso",
                        data: {
                            continue: true,
                            inserimentoDatiAvviso: true
                        }
                    },
                    {
                        id: "back",
                        data: {
                            continue: false,
                            goBack: true,
                            inserimentoDatiAvviso: false
                        }
                    }
                ]
            },
            transactionId: "06789-12345-0001-64874412-1712660850000-754a2124-1",
            outcome: {
                result: "OK",
                description: "The operation completed successfully"
            }
        };
    }

    afterEach(() => {
        global.fetch = originalFetch;
    });

    test("renders not-menu touchInterface", () => {
        const responseProcess = getTestResponse(150, undefined, content);
        const touchInterface = true;
        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        expect(screen.getByText("Conferma")).toBeInTheDocument();
    });

    test("renders menu no-touchInterface no-pagination", () => {
        const responseProcess = getMenuTestResponseShort();
        const touchInterface = false;
        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        expect(screen.getByText("A quale servizio vuoi accedere?")).toBeInTheDocument();
    });

    test("renders menu touchInterface with pagination", () => {
        const responseProcess = getMenuTestResponseLong();
        const touchInterface = false;
        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        const nextLiElement = screen.getByTestId("nextLiTestButton");
        const prevLiElement = screen.getByTestId("prevLiTestButton");
        expect(nextLiElement.classList.contains("hidden")).not.toBe(true);
        expect(prevLiElement.classList.contains("hidden")).toBe(true);

        fireEvent.click(nextLiElement);
        expect(nextLiElement.classList.contains("hidden")).toBe(true);
        expect(prevLiElement.classList.contains("hidden")).not.toBe(true);

        fireEvent.click(prevLiElement);
    });

    test("calling next success and setCommand", () => {
        const responseProcess = getMenuTestResponseShort();
        const touchInterface = true;
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: getTestResponse(150, undefined, "TEST_CONTENT")
            }),
        });

        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        const exitButton = screen.getByText("Esci");
        fireEvent.click(exitButton);
        expect(global.fetch).toHaveBeenCalled();
    });

    test("calling next 204", async () => {
        const responseProcess = getMenuTestResponseShort();
        const touchInterface = true;
        global.fetch = jest.fn().mockResolvedValueOnce({
            status: 204,
        });

        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        const idPayButton = screen.getByText("Gestisci le iniziative ID Pay");
        fireEvent.click(idPayButton);
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    });

    test("calling next 401", async () => {
        const responseProcess = getMenuTestResponseShort();
        const touchInterface = true;
        global.fetch = jest.fn().mockResolvedValueOnce({
            status: 401,
        });

        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <MemoryRouter initialEntries={["/service-access"]}>
                    <ServiceAccessPage />
                </MemoryRouter>
            </Ctx.Provider>
        );
        const idPayButton = screen.getByText("Gestisci le iniziative ID Pay");
        fireEvent.click(idPayButton);
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        // expect(window.location.pathname).toBe("/login")
    });

    test("calling next 202", async () => {
        const responseProcess = getMenuTestResponseShort();
        const touchInterface = true;
        global.fetch = jest.fn().mockResolvedValue({
            status: 202,
        });

        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        const idPayButton = screen.getByText("Gestisci le iniziative ID Pay");
        fireEvent.click(idPayButton);
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));
    });

    test("calling next 400", async () => {
        const responseProcess = getMenuTestResponseShort();
        const touchInterface = true;
        global.fetch = jest.fn().mockResolvedValueOnce({
            status: 400,
            json: () => Promise.resolve({
                message: "something went wrong"
            }),

        });

        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        const idPayButton = screen.getByText("Gestisci le iniziative ID Pay");
        fireEvent.click(idPayButton);
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    });

    test("test with timeout null and useEffect PRINT_RECEIPT command", async () => {
        const responseProcess = getTestResponse(null, "PRINT_RECEIPT", undefined);
        const touchInterface = true;
        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        await new Promise(res => setTimeout(res, 3000));
    });

    test("test with timeout null and useEffect SCAN_BIIL_DATA command", () => {
        const responseProcess = getTestResponse(null, "SCAN_BIIL_DATA", undefined);
        const touchInterface = true;
        global.fetch = jest.fn();
        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        const inputButton = screen.getByText("Conferma");
        fireEvent.click(inputButton);
        expect(global.fetch).toHaveBeenCalled();
    });

    test("test with timeout null and useEffect AUTHORIZE command", () => {
        const responseProcess = getTestResponse(null, "AUTHORIZE", undefined);
        const touchInterface = true;
        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        expect(screen.getByText("Seleziona l'esito da simulare per il pagamento", { exact: false })).toBeInTheDocument();
        expect(screen.getByText("Autorizzare")).toBeInTheDocument();
        expect(screen.getByText("Esito Dubbio")).toBeInTheDocument();
        expect(screen.getByText("Autorizzazione negata")).toBeInTheDocument();
    });

    test("test with timeout null and useEffect END command", async () => {
        const responseProcess = getTestResponse(null, "END", undefined);
        const touchInterface = true;
        global.fetch = jest.fn();
        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
    });

    test("test with timeout null and useEffect NEXT command", () => {
        const responseProcess = getTestResponse(null, "NEXT", undefined);
        const touchInterface = true;
        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
    });

    test("test with timeout null and useEffect GET_IBAN command", () => {
        const responseProcess = getTestResponse(null, "GET_IBAN", undefined);
        const touchInterface = true;
        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
    });

    test("test with timeout null and useEffect GET_PAN command", () => {
        const responseProcess = getTestResponse(null, "GET_PAN", undefined);
        const touchInterface = true;
        render(
            <Ctx.Provider value={{ responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList }}>
                <BrowserRouter>
                    <ServiceAccessPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
    });

    test("test with UNKNOWN command", () => {
        const unhandledDriver = "UNHANDLED_DRIVER";
        const setCommand = jest.fn();
        const next = jest.fn();
        const responseProcess = {}; 
        const result = executeCommand(unhandledDriver, setCommand, next, responseProcess);
        expect(result).toBe("");
        expect(setCommand).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
      });
});