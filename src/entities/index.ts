/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: contactinquiries
 * Interface for ContactInquiries
 */
export interface ContactInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  interest?: string;
  /** @wixFieldType text */
  message?: string;
}


/**
 * Collection ID: smarthomeproducts
 * @catalog This collection is an eCommerce catalog
 * Interface for SmartHomeProducts
 */
export interface SmartHomeProducts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType text */
  technicalSpecifications?: string;
}


/**
 * Collection ID: smarthomeservices
 * Interface for SmartHomeServices
 */
export interface SmartHomeServices {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceTitle?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  installationProcess?: string;
  /** @wixFieldType text */
  keyBenefits?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  serviceImage?: string;
}
