import Stripe from 'stripe';
import { ENV_VARS } from '../config/env.config';

const stripe = new Stripe(ENV_VARS.STRIPE_SECRET_KEY);

export default stripe;