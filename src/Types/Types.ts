export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  district?: string;
  thana?: string;
  address?: string;
  isBlocked: boolean;
  isDeleted: boolean;
  isGoogle: boolean;
  role: string;
  image?: string;
  createdAt: Date;
};

export type Auth = {
  user: UserType | null;
  accessToken: string | null;
  isLoading: boolean;
};

export type ConsultantType = {
  id: string;
  title: string;
  fullName: string;
  image: string;
  bio: string;
  slug: string;
  address: string;
  experience: string | number;
  categoryId: string;
  isActive: boolean;
  isDeleted: boolean
  category: CategoryType;
  specializations: string[];
  qualifications: { title: string, institute: string }[]
}

export type SubCategory = {
  id: string;
  title: string;
  slug: string;
  image: string;
  categoryId: number;
  category: CategoryType;
};

export type CategoryType = {
  id: string;
  title: string;
  slug: string;
  image: string;
  isDeleted: boolean;
  isActive: boolean;
  createdById: string;
  updatedById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: CategoryUser;
  updatedBy: CategoryUser;
  subCategories: SubCategory[];
};

export type CategoryUser = {
  id: string;
  firstName: string;
  lastName: string;
  image: string | null;
  email: string;
};



export type BannerType = {
  id: string;
  image: string;
  link?: string;
  title: string;
  slug: string;
  isActive: boolean;
  createdById: string;
  updatedById: string;
};

export type ProductImageType = {
  id: string;
  image: string;
}

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  price?: number;
  categoryId: string;
  subCategoryId: string;
  stock: number;
  category: CategoryType;
  subCategory: SubCategory;
  modelNumber: string;
  brand: CategoryType;
  images: ProductImageType[];
  discount: number;
  expiresAt: string
};

export type ServiceType = {
  id: string;
  title: string;
  price?: number;
  thumbnail: string;
  slug: string;
  description: string;
  categoryId: string;
  category: CategoryType;
  images: ProductImageType[];
};

export type BreadcrumbItemType = {
  label: string;
  href?: string; // If not provided, it's the current page
};

export type OrderType = {
  id: string;
  address: string;
  phone: string;
  productRequestStatus: string;
  productStatus: string;
  serviceStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  _count: { productItems: number, serviceItems: number, productRequests: number }

}


export type ProductRequestOrderItemType = {
  id: string;
  fileName: string;
  title: string;
  orderId: string;
  price?: string | number;
  quantity: number;
  description: string;
  createAt: string;
  updatedAt: string;
}