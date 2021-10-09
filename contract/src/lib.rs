use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, setup_alloc};
use serde::Serialize;
use rand::{
    distributions::{Distribution, Standard},
    Rng,
}; // 0.8.0

setup_alloc!();

//Fungsi utama mulai dari sini
#[derive(BorshDeserialize, BorshSerialize, Serialize, Clone, Copy, Debug, Eq, PartialEq)]
pub enum FaceTo {
	LEFT,
	RIGHT
}

impl Distribution<FaceTo> for Standard {
    fn sample<R: Rng + ?Sized>(&self, rng: &mut R) -> FaceTo {
        match rng.gen_range(0..2) {
            0 => FaceTo::LEFT,
            1 => FaceTo::RIGHT,
			_ => FaceTo::LEFT
        }
    }
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Status {
	id: i16,
	weight: i16,
	hunger: i16,
	happines: i16,
	is_sick: bool,
	Facing: FaceTo
}

// Default value for every key pair
impl Default for Status {
	fn default() -> Self {
		Self {
			id: 1,
			weight: 1,
			hunger: 1,
			happines: 4,
			is_sick: false,
			Facing: FaceTo::LEFT
		}
	}
}

#[near_bindgen]
impl Status {
	
	pub fn get_weight(&self) -> i16 {
		self.weight
	}
	
	pub fn get_hunger(&self) -> i16 {
		self.hunger
	}
	
	fn health_check(&self) -> bool {
		if !self.is_sick { return true; }
		else { return false; }
	}
	
	pub fn medicine(&mut self) {
		if self.is_sick { self.is_sick = false; }
	}
	
	pub fn meal(&mut self) {
		if self.health_check() {
			self.weight = i16::wrapping_add(self.weight, 1);
			self.hunger = 4;
		}
	}
	
	pub fn play(&mut self) -> FaceTo {
		self.Facing = rand::random();
		self.Facing
	}
	
	pub fn snack(&mut self) {
		if self.health_check() {
			if self.hunger > 4 { self.is_sick = true; }
			
			self.weight = i16::wrapping_add(self.weight, 2);
			self.hunger = i16::wrapping_add(self.hunger, 1);
		}
	}
	
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    // mock the context for testing, notice "signer_account_id" that was accessed above from env::
    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice_near".to_string(),
            signer_account_id: "bob_near".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "carol_near".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }
	
	#[test]
	fn make_sick() {
		let context = get_context(vec![], true);
		testing_env!(context);
		let mut contract = Status::default();
		contract.meal();
		contract.snack();
		contract.snack();
		contract.snack();
		assert_eq!(false, contract.health_check()); 
	}
	
	#[test]
	fn medicine() {
		let context = get_context(vec![], true);
		testing_env!(context);
		let mut contract = Status::default();
		contract.meal();
		contract.snack();	
		contract.snack();
		contract.snack();
		contract.medicine();
		assert_eq!(true, contract.health_check()); 
	}
	
	#[test]
	fn play() {
		let context = get_context(vec![], true);
		testing_env!(context);
		let mut contract = Status::default();
		assert_eq!(FaceTo::LEFT, contract.play());
	}
}
