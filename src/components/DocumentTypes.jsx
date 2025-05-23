import React from 'react';
import { useLocale } from './LocaleProvider';
import { CO  } from '@/components/icons/flagpack/CO';
import { PR  } from '@/components/icons/flagpack/PR';
import { EC  } from '@/components/icons/flagpack/EC';
import { CR } from '@/components/icons/flagpack/CR';
import { CL } from '@/components/icons/flagpack/CL';
import { PA } from '@/components/icons/flagpack/PA';
import { BR } from '@/components/icons/flagpack/BR';
import { PE } from '@/components/icons/flagpack/PE';
import { BZ } from '@/components/icons/flagpack/BZ';
import { UY } from '@/components/icons/flagpack/UY';
import { HN } from '@/components/icons/flagpack/HN';


const documentData = {
    Global: {
        en: {
            title: 'Global',
            note: '',
            documents: [
                { code: 'PPN', name: 'Passport', pattern: '/^[a-zA-Z0-9_]{4,16}$/' },
                { code: 'TAX', name: 'TAX', pattern: '/^[a-zA-Z0-9_]{4,16}$/' },
                { code: 'LIC', name: 'Labeler Identification Code', pattern: '/^[a-zA-Z0-9_]{4,16}$/' },
            ]
        },
        es: {
            title: 'Global',
            note: '',
            documents: [
                { code: 'PPN', name: 'Pasaporte', pattern: '/^[a-zA-Z0-9_]{4,16}$/' },
                { code: 'TAX', name: 'TAX', pattern: '/^[a-zA-Z0-9_]{4,16}$/' },
                { code: 'LIC', name: 'Labeler Identification Code', pattern: '/^[a-zA-Z0-9_]{4,16}$/' },
            ]
        }
    },
    PR: {
        es: {
            icon: PR, 
            title: 'Puerto Rico',
            note: 'Para Puerto Rico no es requerido enviar los campos documentType y document',
            documents: [
                { code: 'EIN', name: 'Employer Identification Number', pattern: '/^[1-9]\\d?-\\d{7}$/' }
            ]
        }
    },
    CO: {
        es: {
            icon: CO, 
            title: 'Colombia',
            note: '',
            documents: [
                { code: 'CC', name: 'Cédula de ciudadanía', pattern: '/^[1-9][0-9]{3,9}$/' },
                { code: 'CE', name: 'Cédula de extranjería', pattern: '/^([a-zA-Z]{1,5})?[1-9][0-9]{3,7}$/' },
                { code: 'TI', name: 'Tarjeta de identidad', pattern: '/^[1-9][0-9]{4,11}$/' },
                { code: 'NIT', name: 'Número de Identificación Tributaria', pattern: '/^[1-9]\\d{6,9}$/' },
                { code: 'RUT', name: 'Registro único tributario', pattern: '/^[1-9]\\d{6,9}$/' },
            ]
        }
    },
    EC: {
        es: {
            icon: EC,
            title: 'Ecuador',
            note: '',
            documents: [
                { code: 'CI', name: 'Cédula de identidad', pattern: '/^\\d{10}$/' },
                { code: 'RUC', name: 'Registro Único de Contribuyentes', pattern: '/^\\d{13}$/' }
            ]
        }
    },
    CR: {
        es: {
            icon: CR,
            title: 'Costa Rica',
            note: '',
            documents: [
                { code: 'CRCPF', name: 'Cédula personal física', pattern: '/^[1-9][0-9]{8}$/' },
                { code: 'CPJ', name: 'Cédula personal juridica', pattern: '/^[1-9][0-9]{9}$/' },
                { code: 'DIMEX', name: 'Documento de identificación de Migración y Extranjería', pattern: '/^[1-9][0-9]{10,11}$/' },
                { code: 'DIDI', name: 'Documento de identificación de diplomáticos', pattern: '/^[1-9][0-9]{10,11}$/' }
            ]
        }
    },
    CL: {
        es: {
            icon: CL,
            title: 'Chile',
            note: '',
            documents: [
                { code: 'CLRUT', name: 'Cédula personal física', pattern: '/^(\\d{1,2}(?:\\.?\\d{1,3}){2}-[\\dKk])$/' }
            ]
        }
    },
    PA: {
        es: {
            icon: PA,
            title: 'Panamá',
            note: '',
            documents: [
                { code: 'CIP', name: 'Cédula de identidad personal', pattern: '/^(N|E|PE\\d+)?\\d{2,6}\\d{2,6}$/' },
                { code: 'PARUC', name: 'Registro Único de Contribuyente', pattern: '/^[a-zA-Z0-9\\-]{1,16}$/' }
            ]
        }
    },
    BR: {
        es: {
            icon: BR,
            title: 'Brasil',
            note: '',
            documents: [
                { code: 'CPF', name: 'Cadastro de Pessoas Físicas', pattern: '/^\\d{10,11}$/' }
            ]
        }
    },
    PE: {
        es: {
            icon: PE,
            title: 'Perú',
            note: '',
            documents: [
                { code: 'DNI', name: 'DNI', pattern: '/^\\d{8}$/' },
                { code: 'PERUC', name: 'Registro Único de Contribuyentes', pattern: '/^(10|15|16|17|20)\\d{9}$/' }
            ]
        }
    },
    HN: {
        es: {
            icon: HN,
            title: 'Honduras',
            note: '',
            documents: [
                { code: 'HNDNI', name: 'Documento nacional de identificación', pattern: '/^[a-zA-Z0-9]{1,15}$/' },
                { code: 'HNDR', name: 'Documento de residencia', pattern: '/^[a-zA-Z0-9]{1,15}$/' },
                { code: 'RTN', name: 'Número de registro tributario', pattern: '/^[0-9]{14,16}$/' }
            ]
        }
    },
    BZ: {
        es: {
            icon: BZ,
            title: 'Belice',
            note: '',
            documents: [
                { code: 'BZSSN', name: 'Identificación de Seguridad Social', pattern: '/^[0-9]{9}$/' },
                { code: 'BRN', name: 'Business Registration number', pattern: '/^[0-9]{5,7}$/' }
            ]
        }
    },
    UY: {
        es: {
            icon: UY,
            title: 'Uruguay',
            note: '',
            documents: [
                { code: 'UYCI', name: 'Cédula de Identidad', pattern: '/^\\d{6,7}-[0-9]$/' },
                { code: 'UYRUT', name: 'Registro Único Tributario', pattern: '/^\\d{12}$/' }
            ]
        }
    }
};

export function DocumentsRules() {
    const { locale, isEn } = useLocale();

    const getLocalizedData = (countryData) => {
        return countryData?.[locale] || countryData?.es;
    };

    return (
        <div className="space-y-4">
            {Object.keys(documentData).map((countryCode) => {
                const country = getLocalizedData(documentData[countryCode]);

                if (!country || !country.documents) return null;

                return (
                    <div key={countryCode}>
                        <div className="pt-4">
                            <div className='flex gap-x-2 py-0 my-0 items-center'>
                                {country.icon && (
                                    <country.icon className="rounded-sm" />
                                )}
                                <h3 className="text-md font-semibold my-0 py-0">
                                    {country.title}
                                </h3>
                            </div>
                            {country.note && <p className="text-sm m-0">{country.note}</p>}
                        </div>

                        <table className="min-w-full divide-y divide-gray-200  my-0">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 text-left text-md font-medium">
                                        {isEn ? 'Code' : 'Código'}
                                    </th>
                                    <th className="px-4 py-3 text-left text-md font-medium">
                                        {isEn ? 'Document type' : 'Tipo de documento'}
                                    </th>
                                    <th className="px-4 py-3 text-left text-md font-medium">
                                        {isEn ? 'Validation rule' : 'Regla de validación'}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {country.documents?.map((doc) => (
                                    <tr key={doc.code} className="">
                                        <td className="px-4 py-3 font-mono text-sm">{doc.code}</td>
                                        <td className="px-4 py-3 text-sm">{doc.name}</td>
                                        <td className="px-4 py-3">
                                            <code className="px-2 py-1 rounded text-sm">
                                                {doc.pattern}
                                            </code>
                                        </td>
                                    </tr>
                                ))}
                                {country.documents && country.documents.length > 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-4"></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}