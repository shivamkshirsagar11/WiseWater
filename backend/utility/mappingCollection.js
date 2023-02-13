import Customer from '../models/customerModel.js';
import Owner from '../models/ownerModel.js';
import Worker from '../models/workerModel.js';

export function mapCollectionName(collectionName){
    switch(collectionName){
        case "Customer":
            return Customer;
        case "Owner":
            return Owner;
        case "Worker":
            return Worker;
    }
}
