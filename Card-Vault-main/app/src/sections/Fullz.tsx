import { useState } from 'react';
import { Hash, Shield, ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';

// Fullz data interface
interface FullzEntry {
  id: string;
  fullName: string;
  homeAddress: string;
  dateOfBirth: string;
  ssn: string;
  phone: string;
  email: string;
  cardDetails: string;
  cvvExpiry: string;
  bankAccount: string;
  driversLicense: string;
  passport: string;
  mothersMaidenName: string;
  securityQA: string;
  bankingLogin: string;
  emailAccess: string;
  utilityBills: string;
  employmentInfo: string;
  taxId: string;
  medicalInsurance: string;
  idPhotos: string;
  selfies: string;
  price: number;
  status: 'available' | 'sold';
}

// Country data with flag emojis and fullz entries
const countryData = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    code: 'US',
    entries: Array.from({ length: 50 }, (_, i) => {
      const firstNames = ['John', 'James', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew', 'Joshua', 'Kenneth', 'Kevin', 'Brian', 'George', 'Edward'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris'];
      const states = [
        'California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan',
        'New Jersey', 'Virginia', 'Washington', 'Arizona', 'Massachusetts', 'Tennessee', 'Indiana', 'Missouri', 'Maryland', 'Wisconsin',
        'Colorado', 'Minnesota', 'South Carolina', 'Alabama', 'Louisiana', 'Kentucky', 'Oregon', 'Oklahoma', 'Connecticut', 'Utah',
        'Iowa', 'Nevada', 'Arkansas', 'Mississippi', 'Kansas', 'New Mexico', 'Nebraska', 'West Virginia', 'Idaho', 'Hawaii',
        'New Hampshire', 'Maine', 'Montana', 'Rhode Island', 'Delaware', 'South Dakota', 'North Dakota', 'Alaska', 'Vermont', 'Wyoming'
      ];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const state = states[Math.floor(Math.random() * states.length)];

      return {
        id: `us-${i + 1}`,
        fullName: `${firstName} ${lastName} (${state})`,
        homeAddress: 'HIDDEN',
        dateOfBirth: 'HIDDEN',
        ssn: 'HIDDEN',
        phone: 'HIDDEN',
        email: 'HIDDEN',
        cardDetails: 'HIDDEN',
        cvvExpiry: 'HIDDEN',
        bankAccount: 'HIDDEN',
        driversLicense: 'HIDDEN',
        passport: 'HIDDEN',
        mothersMaidenName: 'HIDDEN',
        securityQA: 'HIDDEN',
        bankingLogin: 'HIDDEN',
        emailAccess: 'HIDDEN',
        utilityBills: 'HIDDEN',
        employmentInfo: 'HIDDEN',
        taxId: 'HIDDEN',
        medicalInsurance: 'HIDDEN',
        idPhotos: 'HIDDEN',
        selfies: 'HIDDEN',
        price: 20 + Math.floor(Math.random() * 5), // Random price between 20-25
        status: (Math.random() > 0.1 ? 'available' : 'sold') as 'available' | 'sold'
      };
    })
  },
  {
    id: 'eu',
    name: 'European Union',
    flag: '🇪🇺',
    code: 'EU',
    entries: Array.from({ length: 50 }, (_, i) => {
      const firstNames = ['Hans', 'Klaus', 'Franz', 'Wolfgang', 'Heinz', 'Karl', 'Otto', 'Günther', 'Dieter', 'Horst', 'Jürgen', 'Peter', 'Werner', 'Gerhard', 'Walter', 'Heinrich', 'Helmut', 'Fritz', 'Kurt', 'Herbert', 'Johann', 'Rudolf', 'Ernst', 'Willi', 'Alfred'];
      const lastNames = ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Krüger', 'Hofmann', 'Hartmann', 'Lange'];
      const countries = ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria', 'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Slovakia', 'Slovenia', 'Croatia', 'Romania', 'Bulgaria', 'Greece', 'Portugal', 'Ireland'];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const country = countries[Math.floor(Math.random() * countries.length)];

      return {
        id: `eu-${i + 1}`,
        fullName: `${firstName} ${lastName} (${country})`,
        homeAddress: 'HIDDEN',
        dateOfBirth: 'HIDDEN',
        ssn: 'HIDDEN',
        phone: 'HIDDEN',
        email: 'HIDDEN',
        cardDetails: 'HIDDEN',
        cvvExpiry: 'HIDDEN',
        bankAccount: 'HIDDEN',
        driversLicense: 'HIDDEN',
        passport: 'HIDDEN',
        mothersMaidenName: 'HIDDEN',
        securityQA: 'HIDDEN',
        bankingLogin: 'HIDDEN',
        emailAccess: 'HIDDEN',
        utilityBills: 'HIDDEN',
        employmentInfo: 'HIDDEN',
        taxId: 'HIDDEN',
        medicalInsurance: 'HIDDEN',
        idPhotos: 'HIDDEN',
        selfies: 'HIDDEN',
        price: 20 + Math.floor(Math.random() * 5), // Random price between 20-25
        status: (Math.random() > 0.1 ? 'available' : 'sold') as 'available' | 'sold'
      };
    })
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    code: 'UK',
    entries: Array.from({ length: 50 }, (_, i) => {
      const firstNames = ['James', 'John', 'David', 'Michael', 'Christopher', 'Matthew', 'Daniel', 'Andrew', 'Richard', 'Paul', 'Mark', 'Thomas', 'Stephen', 'Anthony', 'Charles', 'Robert', 'William', 'Joseph', 'Edward', 'George', 'Peter', 'Brian', 'Kevin', 'Patrick', 'Alan'];
      const lastNames = ['Smith', 'Jones', 'Williams', 'Brown', 'Taylor', 'Davies', 'Wilson', 'Evans', 'Thomas', 'Johnson', 'Roberts', 'Robinson', 'Thompson', 'Wright', 'Walker', 'White', 'Edwards', 'Hughes', 'Green', 'Hall', 'Lewis', 'Harris', 'Clarke', 'Patel', 'Jackson'];
      const regions = ['Greater London', 'West Midlands', 'Greater Manchester', 'West Yorkshire', 'Kent', 'Essex', 'Merseyside', 'South Yorkshire', 'Hampshire', 'Surrey', 'Hertfordshire', 'Tyne and Wear', 'Norfolk', 'Staffordshire', 'Cheshire', 'Derbyshire', 'Nottinghamshire', 'Leicestershire', 'North Yorkshire', 'Lancashire', 'East Sussex', 'West Sussex', 'Cambridgeshire', 'Northumberland', 'Shropshire', 'Somerset', 'Cornwall', 'Cumbria', 'Durham', 'Dorset', 'Gloucestershire', 'Wiltshire', 'Devon', 'Worcestershire', 'Lincolnshire', 'Buckinghamshire', 'Northamptonshire', 'Oxfordshire', 'Warwickshire', 'Berkshire', 'Bedfordshire', 'Isle of Wight', 'Herefordshire', 'Rutland', 'Scotland', 'Wales', 'Northern Ireland'];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];

      return {
        id: `uk-${i + 1}`,
        fullName: `${firstName} ${lastName} (${region})`,
        homeAddress: 'HIDDEN',
        dateOfBirth: 'HIDDEN',
        ssn: 'HIDDEN',
        phone: 'HIDDEN',
        email: 'HIDDEN',
        cardDetails: 'HIDDEN',
        cvvExpiry: 'HIDDEN',
        bankAccount: 'HIDDEN',
        driversLicense: 'HIDDEN',
        passport: 'HIDDEN',
        mothersMaidenName: 'HIDDEN',
        securityQA: 'HIDDEN',
        bankingLogin: 'HIDDEN',
        emailAccess: 'HIDDEN',
        utilityBills: 'HIDDEN',
        employmentInfo: 'HIDDEN',
        taxId: 'HIDDEN',
        medicalInsurance: 'HIDDEN',
        idPhotos: 'HIDDEN',
        selfies: 'HIDDEN',
        price: 20 + Math.floor(Math.random() * 5), // Random price between 20-25
        status: (Math.random() > 0.1 ? 'available' : 'sold') as 'available' | 'sold'
      };
    })
  },
  {
    id: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    code: 'CA',
    entries: Array.from({ length: 50 }, (_, i) => {
      const firstNames = ['Michael', 'Christopher', 'Matthew', 'David', 'James', 'John', 'Robert', 'Daniel', 'Joseph', 'Andrew', 'Ryan', 'Nicholas', 'Tyler', 'William', 'Jonathan', 'Alexander', 'Brandon', 'Anthony', 'Kevin', 'Thomas', 'Eric', 'Steven', 'Justin', 'Brian', 'Adam'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark'];
      const provinces = ['Ontario', 'British Columbia', 'Quebec', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador', 'Prince Edward Island', 'Northwest Territories', 'Nunavut', 'Yukon'];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const province = provinces[Math.floor(Math.random() * provinces.length)];

      return {
        id: `ca-${i + 1}`,
        fullName: `${firstName} ${lastName} (${province})`,
        homeAddress: 'HIDDEN',
        dateOfBirth: 'HIDDEN',
        ssn: 'HIDDEN',
        phone: 'HIDDEN',
        email: 'HIDDEN',
        cardDetails: 'HIDDEN',
        cvvExpiry: 'HIDDEN',
        bankAccount: 'HIDDEN',
        driversLicense: 'HIDDEN',
        passport: 'HIDDEN',
        mothersMaidenName: 'HIDDEN',
        securityQA: 'HIDDEN',
        bankingLogin: 'HIDDEN',
        emailAccess: 'HIDDEN',
        utilityBills: 'HIDDEN',
        employmentInfo: 'HIDDEN',
        taxId: 'HIDDEN',
        medicalInsurance: 'HIDDEN',
        idPhotos: 'HIDDEN',
        selfies: 'HIDDEN',
        price: 20 + Math.floor(Math.random() * 5), // Random price between 20-25
        status: (Math.random() > 0.1 ? 'available' : 'sold') as 'available' | 'sold'
      };
    })
  }
];

const tableColumns = [
  { key: 'fullName', label: 'Full Name' },
  { key: 'homeAddress', label: 'Home Address' },
  { key: 'dateOfBirth', label: 'Date of Birth' },
  { key: 'ssn', label: 'SSN/National ID' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'email', label: 'Email Address' },
  { key: 'cardDetails', label: 'Card Details' },
  { key: 'cvvExpiry', label: 'CVV & Expiry' },
  { key: 'bankAccount', label: 'Bank Account' },
  { key: 'driversLicense', label: "Driver's License" },
  { key: 'passport', label: 'Passport Details' },
  { key: 'mothersMaidenName', label: "Mother's Maiden Name" },
  { key: 'securityQA', label: 'Security Q&A' },
  { key: 'bankingLogin', label: 'Banking Login' },
  { key: 'emailAccess', label: 'Email Access' },
  { key: 'utilityBills', label: 'Utility Bills' },
  { key: 'employmentInfo', label: 'Employment Info' },
  { key: 'taxId', label: 'Tax ID' },
  { key: 'medicalInsurance', label: 'Medical Insurance' },
  { key: 'idPhotos', label: 'ID Photos' },
  { key: 'selfies', label: 'Selfies/Facial' }
];

export function Fullz({ onProductSold }: { onProductSold?: (productName: string, price: number, balance: number) => void }) {
  const { ref, isVisible } = useScrollAnimation();
   const { addToCart } = useCart();
   const { reduceStock } = useStore();
   const [selectedCountry, setSelectedCountry] = useState<typeof countryData[0] | null>(null);
   const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (entry: any) => {
    const product = {
      id: entry.id,
      name: `${entry.fullName} - ${countryData.find(c => c.entries.includes(entry))?.name || 'Fullz'} Package`,
      description: `Complete identity package for ${entry.fullName}`,
      price: entry.price,
      category: 'fullz' as const,
      features: tableColumns.map(col => `${col.label}: ${entry[col.key as keyof FullzEntry]}`),
      stock: 1,
      rating: 4.8,
      reviews: 100,
      stockOptions: [{ price: entry.price, balance: 0, stock: 1 }]
    };
    reduceStock(entry.id, 1);
    addToCart(product);
    if (onProductSold) {
      onProductSold(product.name, entry.price, 0);
    }
  };

  return (
    <section id="fullz" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={ref}
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Hash className="w-4 h-4 text-pink-500" />
            <span className="text-pink-600 font-mono text-sm">fullz.catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono text-pink-300 mb-2">
            $ ls -la /fullz/
          </h2>
          <p className="text-pink-500 font-mono text-sm">
            Select a country to view available identity packages
          </p>
        </div>

        {/* Info Banner */}
        <div className="mb-8 p-4 border border-pink-500/30 bg-pink-500/5 rounded">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-pink-400 mt-0.5" />
            <div>
              <h3 className="text-pink-300 font-mono text-sm font-semibold mb-1">Premium Identity Packages</h3>
              <p className="text-pink-500 font-mono text-xs">
                Complete identity packages with full personal details. Click a country flag to view available entries.
                All data is verified and ready for immediate use.
              </p>
            </div>
          </div>
        </div>

        {/* Country Flags */}
        <div className="flex flex-wrap gap-6 mb-8 justify-center">
          {countryData.map((country) => (
            <button
              key={country.id}
              onClick={() => setSelectedCountry(selectedCountry?.id === country.id ? null : country)}
              className={`group flex flex-col items-center gap-2 p-6 border rounded-lg transition-all duration-300 ${
                selectedCountry?.id === country.id
                  ? 'border-pink-400 bg-pink-500/20 shadow-lg shadow-pink-500/20'
                  : 'border-pink-500/30 bg-black hover:border-pink-400 hover:bg-pink-500/10'
              }`}
            >
              <span className="text-6xl group-hover:scale-110 transition-transform">{country.flag}</span>
              <span className="text-pink-300 font-mono text-sm">{country.name}</span>
              <span className="text-pink-500 font-mono text-xs">{country.entries.length} entries</span>
            </button>
          ))}
        </div>

        {/* Data Table */}
        {selectedCountry && (
          <div className="border border-pink-500/30 bg-black/50 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-pink-500/30 bg-pink-500/10">
              <h3 className="text-pink-300 font-mono flex items-center gap-2">
                <span className="text-2xl">{selectedCountry.flag}</span>
                {selectedCountry.name} Fullz Database
                <span className="text-pink-500 text-sm ml-2">({selectedCountry.entries.length} entries)</span>
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-pink-500/30 hover:bg-pink-500/10">
                    <TableHead className="text-pink-400 font-mono w-[50px]">ID</TableHead>
                    <TableHead className="text-pink-400 font-mono">Full Name</TableHead>
                    <TableHead className="text-pink-400 font-mono">DOB</TableHead>
                    <TableHead className="text-pink-400 font-mono">SSN/ID</TableHead>
                    <TableHead className="text-pink-400 font-mono">Card</TableHead>
                    <TableHead className="text-pink-400 font-mono">Price</TableHead>
                    <TableHead className="text-pink-400 font-mono">Status</TableHead>
                    <TableHead className="text-pink-400 font-mono">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCountry.entries.map((entry, index) => (
                    <>
                      <TableRow 
                        key={entry.id} 
                        className="border-pink-500/20 hover:bg-pink-500/10 cursor-pointer"
                        onClick={() => toggleRow(entry.id)}
                      >
                        <TableCell className="font-mono text-pink-500">{index + 1}</TableCell>
                        <TableCell className="font-mono text-pink-300">{entry.fullName}</TableCell>
                        <TableCell className="font-mono text-pink-400">{entry.dateOfBirth}</TableCell>
                        <TableCell className="font-mono text-pink-400">{entry.ssn}</TableCell>
                        <TableCell className="font-mono text-pink-400">{entry.cardDetails}</TableCell>
                        <TableCell className="font-mono text-green-400">${entry.price}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-mono ${
                            entry.status === 'available' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {entry.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {expandedRows[entry.id] ? (
                              <ChevronUp className="w-4 h-4 text-pink-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-pink-400" />
                            )}
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(entry);
                              }}
                              disabled={entry.status === 'sold'}
                              className="bg-pink-500/20 border border-pink-500 text-pink-300 hover:bg-pink-500 hover:text-black disabled:opacity-50"
                            >
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              Add
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      
                      {/* Expanded Row with Full Details */}
                      {expandedRows[entry.id] && (
                        <TableRow className="bg-pink-500/5">
                          <TableCell colSpan={8} className="p-0">
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {tableColumns.map((col) => (
                                <div key={col.key} className="border border-pink-500/20 p-3 rounded">
                                  <div className="text-pink-500 font-mono text-xs mb-1">{col.label}</div>
                                  <div className="text-pink-300 font-mono text-sm">
                                    {entry[col.key as keyof FullzEntry] as string}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedCountry && (
          <div className="text-center py-16 border border-pink-500/20">
            <p className="text-pink-500 font-mono">$ echo "Select a country flag above to view available packages"</p>
          </div>
        )}
      </div>
    </section>
  );
}
