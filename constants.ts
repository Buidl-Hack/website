import abi from './contracts_Hubster_sol_Hubster.json';

export const MUMBAI_CONTRACT = '0x1D58712dbe59A27a18db8e2D82eeA8347784c722';
export const ABI = abi;
export const PROJECT_ID = process.env
  .NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID as string;
export const API_SECRET = process.env
  .NEXT_PUBLIC_INFURA_IPFS_API_SECRET as string;
export const OPTIONS = {
  roles: [
    { text: 'Blockchain dev', value: 'blockchain-dev' },
    { text: 'Front-end dev', value: 'front-end-dev' },
    { text: 'Back-end dev', value: 'back-end-dev' },
    { text: 'Fullstack', value: 'fullstack-dev' },
    { text: 'Mobile dev', value: 'mobile-dev' },
    { text: 'Product Designer', value: 'product-designer' },
    { text: 'Product Manager', value: 'product-manager' },
    { text: 'Project Manager', value: 'project-manager' },
    { text: 'UI/UX ', value: 'ui-ux' },
    { text: 'Visual Designer', value: 'viz-designer' },
    { text: 'Analyst', value: 'analyst' },
    { text: 'Community Manager', value: 'community-manager' },
    { text: 'Devops', value: 'devops' },
    { text: 'Marketing', value: 'marketing' },
    { text: 'Sales', value: 'sales' },
  ],
  experience: [
    { text: '<1y', value: '<1y' },
    { text: '1-2y', value: '1-2y' },
    { text: '2-3y', value: '2-3y' },
    { text: '3-4y', value: '3-4y' },
    { text: '4-5y', value: '4-5y' },
    { text: '5-6y', value: '5-6y' },
    { text: '6-7y', value: '6-7y' },
    { text: '7-8y', value: '7-8y' },
    { text: '>8y', value: '>8y' },
  ],
  interests: [
    { text: 'games', value: 'games' },
    { text: 'DAOs', value: 'DAOs' },
    { text: 'Social Media', value: 'Social Media' },
    { text: 'Storage', value: 'Storage' },
    { text: 'DeFi', value: 'DeFi' },
    { text: 'NFTs', value: 'NFTs' },
    { text: 'Trading', value: 'Trading' },
    { text: 'VR', value: 'VR' },
  ],
  web3Exp: [
    { text: 'beginner', value: 'beginner' },
    { text: 'intermediate', value: 'intermediate' },
    { text: 'expert', value: 'expert' },
  ],
};
