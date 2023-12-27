export interface FAQSProps {
  faqId: string;
  question: string;
  answer: string;
  isPublished?: boolean;
  groups: any[]
  createdAt?: Date;
  updatedAt?: Date;
}

export const initialFaqs: FAQSProps = {
  faqId: '',
  question: '',
  groups: [],
  answer: '',
};

export interface FAQGroupProps {
  faqGroupId: string;
  groupName: string;
  isPublished?: boolean;
  faqs: any[]
  createdAt?: Date;
  updatedAt?: Date;
}

export const initialFaqGroup: FAQGroupProps = {
  faqGroupId: '',
  groupName: '',
  faqs: [],
};
