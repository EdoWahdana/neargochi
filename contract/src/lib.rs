use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, setup_alloc};

setup_alloc!();


#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Status {
	weight: u8,
	hunger: u8,
	happines: u8,
	is_sick: bool,
}

fn random_facing() -> u8 {
	return env::random_seed()[1];
	
}

#[near_bindgen]
impl Status {
	#[init]
	pub fn new() -> Self {
		assert!(env::state_read::<Self>().is_none(), "Already initialized");
		Self {
			weight: 1,
			hunger: 1,
			happines: 1,
			is_sick: false,
		}
	}
	
	pub fn health_check(&self) -> bool {
		if !self.is_sick { return true; }
		else { return false; }
	}
	
	pub fn get_weight(&self) -> u8 {
		self.weight
	}
	
	pub fn get_hunger(&self) -> u8 {
		self.hunger
	}
	
	pub fn get_happines(&self) -> u8 {
		self.happines
	}
	
	pub fn medicine(&mut self) {
		if self.is_sick { self.is_sick = false; }
	}
	
	pub fn meal(&mut self) {
		if self.health_check() {
			self.weight = u8::wrapping_add(self.weight, 1);
			self.hunger = 4;
		}
	}
	
	pub fn play(&mut self, value: u8) -> bool {
		match self.weight.checked_sub(1) {
		    Some(v) => { self.weight = v }
		    None => { self.weight = self.weight }
		}
		
		match self.hunger.checked_sub(1) {
		    Some(v) => { self.hunger = v }
		    None => { self.hunger = self.hunger }
		}
		
		let random_value = random_facing();
		if random_value == value {
			self.happines = u8::wrapping_add(self.happines, 1);
			true
		} else { false }
	}
	
	pub fn snack(&mut self) {
		if self.health_check() {
			if self.hunger > 4 { self.is_sick = true; }
			
			self.weight = u8::wrapping_add(self.weight, 2);
			self.hunger = u8::wrapping_add(self.hunger, 1);
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
		contract.play(1);
		assert_eq!(0, contract.get_weight());
	}
}
