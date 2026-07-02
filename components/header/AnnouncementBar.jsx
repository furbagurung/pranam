import { Leaf, MapPin, Truck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="container announcement-inner">
        <p><Leaf aria-hidden="true" /> 100% natural, thoughtfully made in Nepal</p>
        <div className="announcement-details" aria-label="Store benefits">
          <span><Truck aria-hidden="true" /> Nationwide delivery</span>
          <span><MapPin aria-hidden="true" /> Wholesale & retail</span>
        </div>
      </div>
    </div>
  );
}
